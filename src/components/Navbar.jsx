import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import ConfermationBox from './ConfirmationBox.jsx'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()

  const navigate = useNavigate()
  const [confirm, setConfirm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasNewMessages, setHasNewMessages] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    if (isAuthenticated) {
      const checkNewMessages = () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
          .filter(u => u.username !== user?.username);
        
        for (const otherUser of users) {
          const chatId = [user.username, otherUser.username].sort().join('_');
          const messages = JSON.parse(localStorage.getItem(`chat_${chatId}`) || '[]');
          
          const hasUnread = messages.some(msg => 
            msg.sender !== user.username && !msg.read
          );
          
          if (hasUnread) {
            setHasNewMessages(true);
            return;
          }
        }
        setHasNewMessages(false);
      };

      checkNewMessages();
      const interval = setInterval(checkNewMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, user]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  }

  const toggleMenu = () => {
    // console.log(isAuthenticated);

    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 px-4 py-6 transition-all duration-300 ${
      isScrolled ? 'py-3 backdrop-blur-md' : ''
    }`}>
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Pill */}
        <Link to="/" className={`bg-white/90 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
          isScrolled ? 'py-2' : ''
        }`}>
          <div className="flex items-center space-x-3">
            <img src="/logoTrans.jpg" alt="Brikoulchi Logo" className="h-10 w-10 rounded-full" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Brikoulchi
            </span>
          </div>
        </Link>

        {/* Navigation Pill */}
        <div className="bg-white/90 backdrop-blur-lg rounded-full shadow-lg px-6 py-3 transition-all duration-300 hover:shadow-xl">
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Services
            </Link>
            {console.log(isAuthenticated)}
            {isAuthenticated ? (
              <>
                <Link to="/account" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Account
                </Link>
                <Link to="/my-services" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  My Services
                </Link>
                <Link to="/webchat" className="text-gray-700 hover:text-primary transition-colors font-medium relative">
                  Chat
                  {hasNewMessages && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </Link>
                <div className="flex items-center space-x-3">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                  )}
                  <span className="text-gray-600 font-medium">
                    {user?.firstName || user?.username}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-primary transition-colors p-2"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full right-4 mt-2 md:hidden bg-white/95 backdrop-blur-lg rounded-xl shadow-xl p-4 w-64 border border-gray-200">
            <div className="space-y-3">
              <Link 
                to="/" 
                className="block text-gray-700 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-home w-5 mr-2"></i>
                Home
              </Link>
              <Link 
                to="/services" 
                className="block text-gray-700 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-briefcase w-5 mr-2"></i>
                Services
              </Link>

              {isAuthenticated ? (
                <>
                  <div className="flex items-center py-2 border-b border-gray-200">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </div>
                    )}
                    <div className="ml-3">
                      <div className="font-semibold text-gray-800">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">@{user?.username}</div>
                    </div>
                  </div>
                  <Link 
                    to="/account" 
                    className="block text-gray-700 hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-user w-5 mr-2"></i>
                    Account
                  </Link>
                  <Link 
                    to="/my-services" 
                    className="block text-gray-700 hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-tools w-5 mr-2"></i>
                    My Services
                  </Link>
                  <Link 
                    to="/webchat" 
                    className="block text-gray-700 hover:text-primary transition-colors font-medium py-2 relative"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-comments w-5 mr-2"></i>
                    Chat
                    {hasNewMessages && (
                      <span className="absolute top-2 left-8 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left text-gray-700 hover:text-primary transition-colors font-medium py-2"
                  >
                    <i className="fas fa-sign-out-alt w-5 mr-2"></i>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block text-gray-700 hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-sign-in-alt w-5 mr-2"></i>
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block bg-gradient-to-r from-primary to-secondary text-white text-center py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-user-plus mr-2"></i>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      {confirm && <ConfermationBox 
      onConfirm={()=>{handleLogout();setConfirm(false)}} 
      onCancel={()=>{setConfirm(false)}} 
      message='are you sure you want to logout !?'
      />}
      </nav>
    </div>
  )
}

export default Navbar