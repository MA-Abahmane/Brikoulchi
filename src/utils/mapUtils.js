// Function to get user's location from IP API
export const getUserLocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data')
    }
    
    const data = await response.json()
    
    return {
      lat: data.latitude,
      lng: data.longitude
    }
  } catch (error) {
    console.error('Error fetching location:', error)
    // Default to Cairo, Egypt
    return {
      lat: 30.0444,
      lng: 31.2357
    }
  }
}

// Create custom marker icon
export const createMarkerIcon = (color = '#1E3A8A') => {
  return {
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }
}

// Format coordinates for display
export const formatCoordinates = (lat, lng) => {
  if (!lat || !lng) return 'No coordinates selected'
  
  return `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`
}