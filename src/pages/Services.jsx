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
    <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-royal-blue mb-8">Browse Services</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar with filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        {/* Main content */}
        <div className="flex-grow">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedCategory === 'All Services' ? 'All Services' : `${selectedCategory} Services`}
            </h2>
            <p className="text-gray-600">
              {services.length} {services.length === 1 ? 'service' : 'services'} available
            </p>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">No services found</h3>
              <p className="text-gray-600">
                There are no services available in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Services