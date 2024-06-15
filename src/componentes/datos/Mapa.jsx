import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Iconos personalizados
const iconoBici = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Mapa = () => {
  const [datosBicis, setDatosBicicletas] = useState({ isLoading: false, error: null, data: [] });
  const [center, setCenter] = useState([40.416775, -3.703790]); // Coordenadas de Madrid como valor por defecto.

  useEffect(() => {
    const fetchMarkers = async () => {
      setDatosBicicletas(prevState => ({ ...prevState, isLoading: true }));
      try {
        const bicicletasResponse = await axios.get('http://localhost:5000/bicicletas/all');
        
        // Transformación de los datos para poder mapearlos
        const bicicletas = bicicletasResponse.data.map(bicicleta => {
          if (bicicleta.LATITUD && bicicleta.LONGITUD) {
            return [
              parseFloat(bicicleta.LATITUD.toString().replace(',', '.')),
              parseFloat(bicicleta.LONGITUD.toString().replace(',', '.'))
            ];
          } else {
            console.warn('A la bicicleta le falta una coordenada:', bicicleta);
            return null;
          }
        }).filter(Boolean);

        setDatosBicicletas({ isLoading: false, error: null, data: bicicletas });
        
        console.log('Datos de bicicleta:', bicicletasResponse.data);

        if (bicicletas.length > 0) {
          setCenter([bicicletas[0][0], bicicletas[0][1]]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setDatosBicicletas({ isLoading: false, error: error.message, data: [] });
      }
    };
    fetchMarkers();
  }, []);

  const biciMarkers = useMemo(() => {
    return datosBicis.data.map((pos, i) => (
      <Marker position={pos} icon={iconoBici} key={`bicicleta-${i}`}>
        <Popup>
          Bicicletas<br />Lat: {pos[0]}<br />Lng: {pos[1]}
        </Popup>
      </Marker>
    ));
  }, [datosBicis.data]);

  if (datosBicis.isLoading) {
    return (
      <div>
        Cargando datos de bicicletas...
      </div>
    );
  }

  if (datosBicis.error) {
    return (
      <div>
        {datosBicis.error && <div>Error en cargar bicicletas: {datosBicis.error}</div>}
      </div>
    );
  }

  return (
    <div>
      <h2>Mapa de las bicicletas</h2>
      <MapContainer center={center} zoom={15} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
        />
        {biciMarkers}
      </MapContainer>
    </div>
  );
};

export default Mapa;