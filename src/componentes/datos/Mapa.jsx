import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import axios from 'axios';
import Atras from '../Atras';
import Logout from '../Logout';
import 'leaflet.markercluster';

// Icono personalizado
const iconoBici = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Mapa = ({ onLogout }) => {
  const [datosBicis, setDatosBicicletas] = useState({ isLoading: false, error: null, data: [] });
  const [center, setCenter] = useState([40.416775, -3.703790]); // Coordenadas de Madrid como valor por defecto.
  const [map, setMap] = useState(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      setDatosBicicletas(prevState => ({ ...prevState, isLoading: true }));
      try {
        const bicicletasResponse = await axios.get('http://localhost:5000/bicicletas/all');

        console.log('Datos de bicicleta:', bicicletasResponse.data); // Verificar los datos aquí

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

  useEffect(() => {
    if (!map && datosBicis.data.length > 0) {
      const initializedMap = L.map('map').setView(center, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(initializedMap);

      setMap(initializedMap);
    }

    if (map && datosBicis.data.length > 0) {
      const markers = L.markerClusterGroup();
      datosBicis.data.forEach(pos => {
        const marker = L.marker(pos, { icon: iconoBici }).bindPopup(`Bicicletas<br />Lat: ${pos[0]}<br />Lng: ${pos[1]}`);
        markers.addLayer(marker);
      });

      map.addLayer(markers);
    }
  }, [datosBicis, center, map]);

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
    <div style={{ padding: '20px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'fixed', width: '100%', top: 0, left: 0, backgroundColor: 'white', zIndex: 1000, padding: '10px 20 px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Atras />
        <Logout onLogout={onLogout} />
      </div>
      <h1 style={{ textAlign: 'center', marginTop: '70px' }}>Mapa de bicicletas disponibles</h1>
      <div id="map" style={{ height: '450px', width: '100%' }}></div>
    </div>
  );
};

export default Mapa;