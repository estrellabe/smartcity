import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const Mapa = () => {
  const [datosContenedores, setDatosContenedores] = useState({ isLoading: false, error: false, data: [] });
  const [datosPeatones, setDatosPeatones] = useState({ isLoading: false, error: false, data: [] });
  const [center, setCenter] = useState([40.416775, -3.703790]); // Coordenadas de Madrid como valor por defecto.

  useEffect(() => {
    /* fetchMarkers() difiere de fetchData() de que el primero tiene un uso específico, para mapas, mientras que
    el segundo es más general y se puede usar para cualquier tipo de petición*/
    const fetchMarkers = async () => {
      setDatosContenedores(prevState => ({ ...prevState, isLoading: true }));
      setDatosPeatones(prevState => ({ ...prevState, isLoading: true }));
      try {
        const contenedoresResponse = await axios.get('http://localhost:5000/contenedores/all');
        const peatonesResponse = await axios.get('http://localhost:5000/peatones/all');
        
        const contenedores = contenedoresResponse.data.map(contenedor => [contenedor.LATITUD, contenedor.LONGITUD]);
        const peatones = peatonesResponse.data.map(peaton => [peaton.LATITUD, peaton.LONGITUD]);

        setDatosContenedores({ isLoading: false, error: false, data: contenedores });
        setDatosPeatones({ isLoading: false, error: false, data: peatones });
        
        console.log('Datos de contenedores:', contenedoresResponse.data);
        console.log('Datos de peatones:', peatonesResponse.data);

        if (contenedores.length > 0) {
          setCenter([contenedores[0][0], contenedores[0][1]]);
        } else if (peatones.length > 0) {
          setCenter([peatones[0][0], peatones[0][1]]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setDatosContenedores({ isLoading: false, error: error.message, data: [] });
        setDatosPeatones({ isLoading: false, error: error.message, data: [] });
      }
    };
    fetchMarkers();
  }, []);

  if(!center){
      return (
        <div>
          Cargando el mapa...
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
          {datosContenedores.error && <div><span>Error: {datosContenedores.error}</span></div>}
          {datosPeatones.error && <div><span>Error: {datosPeatones.error}</span></div>}
          {datosContenedores.data.map((pos, i) => (
            <Marker position={pos} key={`contenedor-${i}`}>
              <Popup>
                Contenedor<br />Lat: {pos[0]}<br />Lng: {pos[1]}
              </Popup>
            </Marker>
          ))}
          {datosPeatones.data.map((pos, i) => (
            <Marker position={pos} key={`peaton-${i}`}>
              <Popup>
                Paso de Peatones<br />Lat: {pos[0]}<br />Lng: {pos[1]}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  };
  
  export default Mapa;