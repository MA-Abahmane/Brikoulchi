import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="relative bg-primary text-white mt-12 overflow-hidden">
      {/* Large Brikoulchi Text Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <h1 className="text-[20vw] font-black transform -rotate-12 whitespace-nowrap">
          BRIKOULCHI
        </h1>
      </div>

      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <img src="/logoTrans.jpg" alt="Brikoulchi Logo" className="h-12 w-12" />
              <span className="text-3xl font-bold ml-3">BRIKOULCHI</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted platform for finding local services. Connect with skilled professionals for all your needs.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-full transition duration-300"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-full transition duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-full transition duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-full transition duration-300"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-white transition duration-300">
                  Become a Provider
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition duration-300">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <i className="fas fa-envelope w-6"></i>
                <a href="mailto:support@brikoulchi.com" className="text-gray-300 hover:text-white transition duration-300">
                  support@brikoulchi.com
                </a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone w-6"></i>
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition duration-300">
                  +123 456 7890
                </a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt w-6"></i>
                <span className="text-gray-300">
                  123 Service Street, City
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white border-opacity-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 Brikoulchi. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition duration-300">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white text-sm transition duration-300">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer