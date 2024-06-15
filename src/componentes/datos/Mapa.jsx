import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Iconos personalizados
const iconoContenedor = new L.Icon({
  iconUrl: 'https://www.flaticon.com/free-icon/garbage_7333496?term=container+waste+bin&page=1&position=10&origin=search&related_id=7333496',
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  shadowSize: [30, 30],
  className: 'leaflet-container-icon'
});

const Mapa = () => {
  const [datosContenedores, setDatosContenedores] = useState({ isLoading: false, error: null, data: [] });
  const [center, setCenter] = useState([40.416775, -3.703790]); // Coordenadas de Madrid como valor por defecto.

  useEffect(() => {
    const fetchMarkers = async () => {
      setDatosContenedores(prevState => ({ ...prevState, isLoading: true }));
      try {
        const contenedoresResponse = await axios.get('http://localhost:5000/contenedores/all');
        
        // Transformación de los datos para poder mapearlos
        const contenedores = contenedoresResponse.data.map(contenedor => {
          if (contenedor.LATITUD && contenedor.LONGITUD) {
            return [
              parseFloat(contenedor.LATITUD.toString().replace(',', '.')),
              parseFloat(contenedor.LONGITUD.toString().replace(',', '.'))
            ];
          } else {
            console.warn('Al contenedor le dalta una coordenada:', contenedor);
            return null;
          }
        }).filter(Boolean);

        setDatosContenedores({ isLoading: false, error: null, data: contenedores });
        
        console.log('Datos de contenedores:', contenedoresResponse.data);

        if (contenedores.length > 0) {
          setCenter([contenedores[0][0], contenedores[0][1]]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setDatosContenedores({ isLoading: false, error: error.message, data: [] });
      }
    };
    fetchMarkers();
  }, []);

  const contenedorMarkers = useMemo(() => {
    return datosContenedores.data.map((pos, i) => (
      <Marker position={pos} icon={iconoContenedor} key={`contenedor-${i}`}>
        <Popup>
          Contenedor<br />Lat: {pos[0]}<br />Lng: {pos[1]}
        </Popup>
      </Marker>
    ));
  }, [datosContenedores.data]);

  if (datosContenedores.isLoading) {
    return (
      <div>
        Cargando datos de los contenedores...
      </div>
    );
  }

  if (datosContenedores.error) {
    return (
      <div>
        {datosContenedores.error && <div>Error en contenedores: {datosContenedores.error}</div>}
      </div>
    );
  }

  return (
    <div>
      <h2>Mapa de contenedores y pasos de peatones</h2>
      <MapContainer center={center} zoom={15} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
        />
        {contenedorMarkers}
      </MapContainer>
    </div>
  );
};

export default Mapa;