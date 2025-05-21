import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { getUserLocation, formatCoordinates, createMarkerIcon } from '../utils/mapUtils'
import L from 'leaflet'

// This component handles map click events for location selection
const LocationMarker = ({ position, onLocationSelected, editable = false }) => {
  const [currentPosition, setCurrentPosition] = useState(position)
  
  const map = useMap()
  
  useEffect(() => {
    if (position && position.lat && position.lng) {
      setCurrentPosition(position)
      map.flyTo(position, map.getZoom())
    }
  }, [position, map])
  
  useMapEvents({
    click(e) {
      if (editable) {
        const { lat, lng } = e.latlng
        setCurrentPosition({ lat, lng })
        onLocationSelected({ lat, lng })
      }
    }
  })
  
  if (!currentPosition) {
    return null
  }
  
  const blueIcon = L.icon(createMarkerIcon('#1E3A8A'))
  
  return (
    <Marker position={currentPosition} icon={blueIcon}>
      <Popup>You selected this location</Popup>
    </Marker>
  )
}

// Component for services map with multiple markers
const ServicesMap = ({ services, height = 400 }) => {
  const [userLocation, setUserLocation] = useState({ lat: 30.0444, lng: 31.2357 })
  
  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getUserLocation()
      setUserLocation(location)
    }
    
    fetchLocation()
  }, [])
  
  const blueIcon = L.icon(createMarkerIcon('#1E3A8A'))
  
  return (
    <div style={{ height }}>
      <MapContainer center={userLocation} zoom={10} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {services.map((service) => (
          <Marker 
            key={service.id} 
            position={service.location}
            icon={blueIcon}
          >
            <Popup className="service-popup">
              <div className="font-semibold text-royal-blue">{service.title}</div>
              <div className="text-sm text-gray-600">{service.category} - {service.serviceName}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

// Component for selecting a location on the map
const LocationPickerMap = ({ initialPosition, onLocationSelected }) => {
  const [position, setPosition] = useState(initialPosition || { lat: 30.0444, lng: 31.2357 })
  
  useEffect(() => {
    const fetchLocation = async () => {
      if (!initialPosition) {
        const location = await getUserLocation()
        setPosition(location)
        onLocationSelected(location)
      }
    }
    
    fetchLocation()
  }, [initialPosition, onLocationSelected])
  
  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker 
          position={position} 
          onLocationSelected={onLocationSelected}
          editable={true}
        />
      </MapContainer>
      <div className="map-coords">
        {formatCoordinates(position.lat, position.lng)}
      </div>
    </div>
  )
}

export { ServicesMap, LocationPickerMap }