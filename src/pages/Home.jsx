import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import ServiceSlider from '../components/ServiceSlider.jsx'
import { ServicesMap } from '../components/Map.jsx'
import { serviceCategories, getInitialServices } from '../data/services.js'

const Home = () => {
  const [services, setServices] = useState([])
  const [topRatedServices, setTopRatedServices] = useState([])
  const [newServices, setNewServices] = useState([])
  
  useEffect(() => {
    // Get all services
    const allServices = getInitialServices()
    setServices(allServices)
    
    // Get top rated services
    const servicesWithRatings = allServices.map(service => {
      const reviews = JSON.parse(localStorage.getItem(`reviews_${service.id}`) || '[]')
      const avgRating = reviews.length 
        ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length 
        : 0
      return { ...service, avgRating }
    })
    
    const topRated = [...servicesWithRatings]
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 6)
    setTopRatedServices(topRated)
    
    // Get newest services
    const newest = [...allServices]
      .sort((a, b) => b.id - a.id)
      .slice(0, 6)
    setNewServices(newest)
  }, [])
  
  return (
    <div>
      {/* Hero Section */}
      <Hero />
      
      {/* Top Rated Services Slider */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <ServiceSlider 
            title="Top Rated Services" 
            services={topRatedServices}
          />
        </div>
      </section>
      
      {/* New Services Slider */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ServiceSlider 
            title="Newly Added Services" 
            services={newServices}
          />
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-royal-blue mb-2">Our Service Categories</h2>
            <p className="text-gray-600">Find the perfect service provider for all your needs</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {serviceCategories.slice(0, 8).map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/services" 
              className="inline-flex items-center text-royal-blue hover:text-royal-gold transition duration-150 font-medium"
            >
              View All Categories
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-royal-blue mb-2">Find Services Near You</h2>
            <p className="text-gray-600">Explore service providers in your area</p>
          </div>
          
          <ServicesMap services={services} />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Click on any marker to view service details. Zoom in/out using the + and - buttons or your mouse wheel.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home