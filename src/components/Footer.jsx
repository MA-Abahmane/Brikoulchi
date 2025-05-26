import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#3B5BFF]  text-white mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white hover:text-royal-gold transition duration-150">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-white hover:text-royal-gold transition duration-150">Services</Link>
              </li>
              {/* <li>
                <a href="mailto:support@anam3ak.com" className="text-white hover:text-royal-gold transition duration-150">Contact</a>
              </li> */}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@anam3ak.com" className="flex items-center text-white hover:text-royal-gold transition duration-150">
                  <i className="fas fa-envelope mr-2"></i>
                  support@anam3ak.com
                </a>
              </li>
              <li>
                <a href="tel:+123-456-7890" className="flex items-center text-white hover:text-royal-gold transition duration-150">
                  <i className="fas fa-phone mr-2"></i>
                  +123-456-7890
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-royal-gold transition duration-150"
              >
                <i className="fab fa-facebook-f text-2xl"></i>
                <span className="sr-only">Facebook</span>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-royal-gold transition duration-150"
              >
                <i className="fab fa-twitter text-2xl"></i>
                <span className="sr-only">Twitter</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-royal-gold transition duration-150"
              >
                <i className="fab fa-instagram text-2xl"></i>
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-white">© 2025 Brikoulchi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer