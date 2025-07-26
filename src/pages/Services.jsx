import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CategoryFilter from '../components/CategoryFilter.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { getServicesByCategory } from '../data/services.js'

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All Services'

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [services, setServices] = useState([])

  useEffect(() => {
    const filteredServices =async () => {
      const servs = await getServicesByCategory(selectedCategory)
      setServices(servs)
    }
    filteredServices();

    // Update URL with selected category
    if (selectedCategory === 'All Services') {
      setSearchParams({})
    } else {
      setSearchParams({ category: selectedCategory })
    }
  }, [selectedCategory, setSearchParams])

  const handleCategorySelect = (catname) => {
    console.log(catname);
    setSelectedCategory(catname)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          Browse Services
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover trusted local service providers for all your needs
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white shadow-sm"
          />
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar with filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        {/* Main content */}
        <div className="flex-grow">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === 'All Services' ? 'All Services' : `${selectedCategory} Services`}
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} 
                {searchTerm && ` found for "${searchTerm}"`}
              </p>
            </div>
            
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 sm:mt-0 text-primary hover:text-primary-dark transition-colors flex items-center"
              >
                <i className="fas fa-times mr-2"></i>
                Clear Search
              </button>
            )}
          </div>
          
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredServices.map(service => (
                <div key={service.id} className="animate-fadeIn">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-search text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {searchTerm ? 'No results found' : 'No services available'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? `We couldn't find any services matching "${searchTerm}". Try adjusting your search terms.`
                  : 'There are no services available in this category yet.'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Services