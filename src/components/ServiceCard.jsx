import { Link } from 'react-router-dom'

const ServiceCard = ({ service }) => {
  return (
    <Link to={`/service/${service.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          <img 
            src={`/${service.category.toLowerCase().replace(/\s+/g, '_')}.jpg`}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary backdrop-blur-sm text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg">
            {service.category}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-tag text-primary text-xs"></i>
              </div>
              <span className="font-medium">{service.serviceName} - {service.serviceType}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-phone text-green-600 text-xs"></i>
              </div>
              <span>{service.phone1}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-envelope text-blue-600 text-xs"></i>
              </div>
              <span className="truncate">{service.email}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-primary font-semibold text-sm">View Details</span>
              <i className="fas fa-arrow-right text-primary group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ServiceCard