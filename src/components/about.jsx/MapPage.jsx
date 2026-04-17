// src/pages/MapPage.jsx
import React, { useRef, useEffect } from 'react'; // ✅ Added missing imports
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

// Fix for default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Sample locations
const locations = [
  { name: 'Delhi', lat: 28.6139, lng: 77.209 },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
];

const MapPage = () => {
  const navigate = useNavigate(); // ✅ more conventional name
  const popupRefs = useRef([]);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    popupRefs.current.forEach((ref) => {
      if (ref && ref._map) ref.openOn(ref._map); // ✅ ensure _map is defined
    });
  }, []);

  const containerStyle = {
    height: isMobile ? 'calc(100vh - 100px)' : '70vh',
    margin: isMobile ? '80px 10px 10px 10px' : '110px 10px 10px 10px',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  };

  return (
    <div style={containerStyle}>
      <MapContainer center={[22.9734, 78.6569]} zoom={isMobile ? 4 : 5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {locations.map((location, idx) => (
          <Marker
            key={idx}
            position={[location.lat, location.lng]}
            // eventHandlers={{
            //   click: () => {
            //     navigate(`/location/${location.name}`, { state: location });
            //   }
            // }}
          >
            <Popup ref={(el) => (popupRefs.current[idx] = el)}>
              <strong>{location.name}</strong><br />
              Click marker to view details.
              <button onClick={()=>navigate('/appointment')}>Book Appointment</button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
