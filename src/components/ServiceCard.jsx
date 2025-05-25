import { Link } from 'react-router-dom'

const ServiceCard = ({ service }) => {
  return (
    <Link to={`/service/${service.id}`} className="block">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="h-48 bg-gray-200 relative">
          <img 
            src={`/${service.category.toLowerCase().replace(/\s+/g, '_')}.jpg`}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 bg-secondary/90 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 m-3 rounded-full">
            {service.category}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <i className="fas fa-tag w-5 text-primary"></i>
              <span>{service.serviceName} - {service.serviceType}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <i className="fas fa-phone w-5 text-primary"></i>
              <span>{service.phone1}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <i className="fas fa-envelope w-5 text-primary"></i>
              <span>{service.email}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ServiceCard