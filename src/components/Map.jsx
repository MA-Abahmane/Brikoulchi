import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { getUserLocation, formatCoordinates, createMarkerIcon } from '../utils/mapUtils';
import L from 'leaflet';

const LocationMarker = ({ position, onLocationSelected, editable = false }) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const map = useMap();

  useEffect(() => {
    if (position && position.lat && position.lng) {
      setCurrentPosition(position);
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  useMapEvents({
    click(e) {
      if (editable) {
        const { lat, lng } = e.latlng;
        setCurrentPosition({ lat, lng });
        onLocationSelected({ lat, lng });
      }
    },
  });

  if (!currentPosition) return null;

  const blueIcon = L.icon(createMarkerIcon('#1E3A8A'));

  return (
    <Marker position={currentPosition} icon={blueIcon}>
      <Popup>You selected this location</Popup>
    </Marker>
  );
};

const ServicesMap = ({ services, height = 400 }) => {
  // const [userLocation, setUserLocation] = useState({ lat: 31.7917, lng: 7.0926 });

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     const location = await getUserLocation();
  //     if (location?.lat && location?.lng) {
  //       setUserLocation(location);
  //     }
  //   };
  //   fetchLocation();
  // }, []);

  // const blueIcon = L.icon(createMarkerIcon('#1E3A8A'));

  return (
    // <div style={{ height }}>
    //   <MapContainer center={userLocation} zoom={3} style={{ height: '100%', width: '100%' }}>
    //     <TileLayer
    //       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     />
    //     {services
    //       .filter(service => service && service.lat && service.lng)
    //       .map((service) => (
    //         <Marker
    //           key={service.id}
    //           position={service}
    //           icon={blueIcon}
    //         >
    //           <Popup className="service-popup">
    //             <div className="font-semibold text-royal-blue">{service.name}</div>
    //             <div className="text-sm text-gray-600">{service.category} - {service.description}</div>
    //           </Popup>
    //         </Marker>
    //     ))}
    //   </MapContainer>
    // </div>
  true);
};

const LocationPickerMap = ({ initialPosition, onLocationSelected }) => {
  // const [position, setPosition] = useState(initialPosition || { lat: 30.0444, lng: 31.2357 });

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     if (!initialPosition) {
  //       const location = await getUserLocation();
  //       setPosition(location);
  //       onLocationSelected(location);
  //     }
  //   };
  //   fetchLocation();
  // }, [initialPosition, onLocationSelected]);

  return (
    // <div className="map-container">
    //   <MapContainer center={position} zoom={3} style={{ height: '300px', width: '100%' }}>
    //     <TileLayer
    //       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     />
    //     <LocationMarker
    //       position={position}
    //       onLocationSelected={onLocationSelected}
    //       editable={true}
    //     />
    //   </MapContainer>
    //   <div className="map-coords">
    //     {formatCoordinates(position.lat, position.lng)}
    //   </div>
    // </div>
  true);
};

export { ServicesMap, LocationPickerMap };
