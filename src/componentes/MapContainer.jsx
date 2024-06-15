import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const MapComponent = ({ positionDefault = [4.660779178475431, -74.08494168529754] }) => {
  const [markers, setMarkers] = useState([[4.660779178475431, -74.08494168529754]]);

  const handleClick = (e) => {
    console.log(e.latlng);
    setMarkers([...markers, [e.latlng.lat, e.latlng.lng]]);
  };

  return (
    <MapContainer
      center={positionDefault}
      zoom={4}
      style={{ height: '500px', width: '100%' }}
      onClick={handleClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((markerPosition, i) => (
        <Marker position={markerPosition} key={i}>
          <Popup>
            lat: {markerPosition[0]}
            <br />
            lng: {markerPosition[1]}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};