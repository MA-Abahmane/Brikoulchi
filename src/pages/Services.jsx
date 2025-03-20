"use client"

import { useEffect, useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"
import { useTranslation } from "react-i18next"
import { Star, Eye, ArrowRight, CheckCircle, Users, Clock } from "lucide-react"
import { supabase } from "../lib/supabase"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import { Footer } from "../components/Footer"
import "leaflet/dist/leaflet.css"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

// Fix for default marker icon in webpack/vite environments
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

export const Services = () => {
  const { t, i18n } = useTranslation()
  const [services, setServices] = useState([])
  const [categories, setCategories] = useState([])
  const [featuredProviders, setFeaturedProviders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [center, setCenter] = useState([25.2048, 55.2708])
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategories()
    fetchFeaturedProviders()
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter([position.coords.latitude, position.coords.longitude])
        fetchNearbyServices(position.coords.latitude, position.coords.longitude)
      },
      () => {
        fetchNearbyServices(center[0], center[1])
      },
    )
  }, [])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*").limit(6)

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchFeaturedProviders = async () => {
    try {
      const { data, error } = await supabase
        .from("provider_services")
        .select(`
          *,
          service:services(*),
          provider:profiles(*)
        `)
        .order("rating_avg", { ascending: false })
        .limit(5)

      if (error) throw error
      setFeaturedProviders(data || [])
    } catch (error) {
      console.error("Error fetching featured providers:", error)
    }
  }

  const fetchNearbyServices = async (lat, lng) => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from("provider_services")
        .select(`
          *,
          service:services(*),
          provider:profiles(*)
        `)
        .order("location_lat", { ascending: true })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error("Error fetching services:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getLocalizedName = useCallback(
    (item) => {
      switch (i18n.language) {
        case "ar":
          return item.name_ar
        case "fr":
          return item.name_fr
        default:
          return item.name_en
      }
    },
    [i18n.language],
  )

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Find Trusted Local Service Providers</h1>
            <p className="text-xl mb-8 text-gray-200">
              Connect with skilled professionals in your area for all your service needs. Quality service, verified
              providers, and peace of mind.
            </p>
            <Link
              to="/categories"
              className="inline-flex items-center px-8 py-3 bg-secondary hover:bg-secondary-dark text-primary font-semibold rounded-lg transition-colors"
            >
              Browse Categories
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-white rounded-full"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-white rounded-full"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral mb-4">Why Choose ServiceHub?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We connect you with the best service providers in your area, ensuring quality, reliability, and peace of
              mind for all your service needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
              <p className="text-gray-600">
                All our service providers are thoroughly vetted and verified to ensure quality service delivery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Community</h3>
              <p className="text-gray-600">
                Join our growing community of satisfied customers and reliable service providers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-600">
                Get quick responses from service providers in your area when you need them most.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral">Popular Categories</h2>
            <Link
              to="/categories"
              className="text-primary hover:text-primary-dark flex items-center gap-2 transition-colors"
            >
              View All Categories
              <ArrowRight size={20} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <Link to={`/services?category=${category.id}`}>
                  <div className="relative h-48">
                    <img
                      src={category.image_url || "/placeholder.svg"}
                      alt={getLocalizedName(category)}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-semibold text-white mb-1">{getLocalizedName(category)}</h3>
                      <p className="text-gray-200 text-sm line-clamp-2">{category.description_en}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral mb-4">Top-Rated Service Providers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet our highest-rated professionals, known for their exceptional service quality and customer
              satisfaction.
            </p>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            navigation
            className="pb-12"
          >
            {featuredProviders.map((provider) => (
              <SwiperSlide key={provider.id}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <img
                    src={provider.service.image_url || "/placeholder.svg"}
                    alt={getLocalizedName(provider.service)}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{provider.provider.username}</h3>
                    <p className="text-gray-600 mb-4">{getLocalizedName(provider.service)}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="font-semibold">{provider.rating_avg.toFixed(1)}</span>
                        <span className="text-gray-500">({provider.reviews_count} reviews)</span>
                      </div>
                      <Link
                        to={`/provider/${provider.id}`}
                        className="text-primary hover:text-primary-dark transition-colors"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral mb-4">Find Services Near You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover service providers in your area using our interactive map. Click on markers to view provider
              details and contact information.
            </p>
          </motion.div>

          <div className="h-[600px] rounded-xl overflow-hidden shadow-lg">
            <MapContainer center={center} zoom={11} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {services.map((service) => (
                <Marker key={service.id} position={[service.location_lat, service.location_lng]}>
                  <Popup>
                    <div className="p-4 max-w-xs">
                      <img
                        src={service.service.image_url || "/placeholder.svg"}
                        alt={getLocalizedName(service.service)}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <h3 className="font-bold text-lg mb-1">{getLocalizedName(service.service)}</h3>
                      <p className="text-sm text-gray-600 mb-2">Provider: {service.provider.username}</p>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{service.rating_avg.toFixed(1)}</span>
                        <Eye className="w-4 h-4 ml-2" />
                        <span>{service.views_count}</span>
                      </div>

                      <Link
                        to={`/provider/${service.id}`}
                        className="block w-full text-center bg-primary text-white py-2 rounded-lg hover:bg-primary-light transition-colors mt-2"
                      >
                        View Details
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}

