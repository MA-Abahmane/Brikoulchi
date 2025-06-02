import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-6">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Pill */}
        <Link to="/" className="bg-white/80 backdrop-blur-lg rounded-full px-6 py-2 shadow-lg">
          <div className="flex items-center space-x-2">
            <img src="/logoTrans.jpg" alt="Brikoulchi Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BRIKOULCHI
            </span>
          </div>
        </Link>
        
        {/* Navigation Pill */}
        <div className="bg-white/80 backdrop-blur-lg rounded-full shadow-lg px-6 py-2">
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary transition">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-primary transition">
              Services
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/account" className="text-gray-700 hover:text-primary transition">
                  Account
                </Link>
                <Link to="/my-services" className="text-gray-700 hover:text-primary transition">
                  My Services
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition"
                >
                  Logout
                </button>
                <span className="text-gray-500">
                  Welcome, {user?.firstName || user?.username}
                </span>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary transition">
                  Login
                </Link>
                <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-primary transition"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full right-4 mt-2 md:hidden bg-white rounded-lg shadow-lg p-4 w-48">
            <div className="space-y-3">
              <Link 
                to="/" 
                className="block text-gray-700 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="block text-gray-700 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/account" 
                    className="block text-gray-700 hover:text-primary transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Account
                  </Link>
                  <Link 
                    to="/my-services" 
                    className="block text-gray-700 hover:text-primary transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Services
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left text-gray-700 hover:text-primary transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block text-gray-700 hover:text-primary transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block text-gray-700 hover:text-primary transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar