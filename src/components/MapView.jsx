import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function MapView() {
  const [services, setServices] = useState([]);
  const [center, setCenter] = useState([0, 0]); // Default to Cairo

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
    setServices(storedServices);
    
    if (storedServices.length > 0) {
      setCenter([storedServices[0].location.lat, storedServices[0].location.lng]);
    }
  }, []);


    const customIcon = new L.Icon({
    iconUrl: '/pin.png', // path relative to public folder
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  

  return (
    <div>
      <h1 className="page-title">Service Locations</h1>
      <div className="card" style={{ height: '500px' }}>
        <MapContainer center={center} zoom={3} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {services.map(service => (
            <Marker key={service.id} icon={customIcon} position={[service.location.lat, service.location.lng]}>
              <Popup>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.category} - {service.serviceName}</p>
                  <p>{service.address}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;