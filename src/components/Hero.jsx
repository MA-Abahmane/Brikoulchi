import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative bg-gray-900 h-[50vh]">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-center bg-cover"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-royal-blue opacity-30"></div>
      </div>
      
      {/* Content */}
      <div className="relative flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Find the Best Local Services with Ana M3ak
          </h1>
          <p className="text-lg sm:text-xl text-white mb-8 max-w-xl mx-auto">
            Connect with trusted local service providers in your area for all your needs
          </p>
          <Link 
            to="/services" 
            className="inline-block bg-[#3B5BFF] hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero