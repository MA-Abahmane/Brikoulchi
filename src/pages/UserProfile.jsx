import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard.jsx'
import { getUserServices } from '../data/services.js'
import { useAuth } from '../context/AuthContext.jsx'

const UserProfile = () => {
  const { username } = useParams()
  const { user: currentUser, isAuthenticated } = useAuth()
  const [user, setUser] = useState(null)
  const [services, setServices] = useState([])
  
  useEffect(() => {
    // Get user data
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = users.find(u => u.username === username)
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
    }
    
    // Get user's services
    const userServices = getUserServices(username)
    setServices(userServices)
  }, [username])
  
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* User Info Section */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
              )}
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-primary">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">@{user.username}</p>
              </div>
            </div>
            {isAuthenticated && currentUser?.username !== user.username && (
              <Link
                to="/webchat"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors flex items-center"
              >
                <i className="fas fa-comments mr-2"></i>
                Send Message
              </Link>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-2">
                <p className="flex items-center">
                  <i className="fas fa-envelope mr-3 text-primary"></i>
                  {user.email}
                </p>
                {user.phone && (
                  <p className="flex items-center">
                    <i className="fas fa-phone mr-3 text-primary"></i>
                    {user.phone}
                  </p>
                )}
                {user.phone2 && (
                  <p className="flex items-center">
                    <i className="fas fa-phone mr-3 text-primary"></i>
                    {user.phone2}
                  </p>
                )}
                {user.address && (
                  <p className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-3 text-primary"></i>
                    {user.address}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Service Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {services.length}
                  </div>
                  <div className="text-gray-600">Active Services</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {services.reduce((total, service) => {
                      const reviews = JSON.parse(localStorage.getItem(`reviews_${service.id}`) || '[]')
                      return total + reviews.length
                    }, 0)}
                  </div>
                  <div className="text-gray-600">Total Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Services Section */}
        <div className="border-t border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Services by {user.firstName}
          </h2>
          
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">No services available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile