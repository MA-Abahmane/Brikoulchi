// Function to get user's location from IP API
export const getUserLocation = async () => {
  // Default location (Cairo, Egypt)
  const defaultLocation = {
    lat: 30.0444,
    lng: 31.2357
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0' // Some APIs require a user agent
      }
    })
    
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Validate the response data
    if (!data.latitude || !data.longitude) {
      console.warn('Location API returned invalid coordinates, using default location')
      return defaultLocation
    }

    // Validate coordinates are within reasonable bounds
    if (Math.abs(data.latitude) > 90 || Math.abs(data.longitude) > 180) {
      console.warn('Location API returned invalid coordinates, using default location')
      return defaultLocation
    }
    
    return {
      lat: data.latitude,
      lng: data.longitude
    }
  } catch (error) {
    // Log specific error types for better debugging
    if (error.name === 'AbortError') {
      console.warn('Location fetch timed out, using default location')
    } else if (error instanceof TypeError) {
      console.warn('Network error while fetching location, using default location')
    } else {
      console.warn('Error fetching location:', error.message)
    }
    
    return defaultLocation
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