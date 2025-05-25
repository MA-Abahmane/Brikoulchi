import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { Link } from 'react-router-dom'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

const ServiceSlider = ({ title, services }) => {
  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-royal-blue mb-6">{title}</h2>
      
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 5000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="service-swiper"
      >
        {services.map((service) => (
          <SwiperSlide key={service.id}>
            <Link to={`/service/${service.id}`} className="block">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 relative">
                  <img 
                    src={`/${service.category.toLowerCase().replace(/\s+/g, '_')}.jpg`}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-[rgba(0,170,185,0.9)] backdrop-blur-sm text-white text-xs font-bold px-4 py-2 m-3 rounded-full">
                    {service.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-royal-blue mb-2">{service.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{service.description}</p>
                  
                  {service.avgRating && (
                    <div className="flex items-center mt-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i 
                          key={star}
                          className={`fas fa-star text-sm ${star <= service.avgRating ? 'text-royal-gold' : 'text-gray-300'}`}
                        ></i>
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        ({service.avgRating.toFixed(1)})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ServiceSlider