import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ServicesMap } from '../components/Map.jsx'

const ServiceDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const services = JSON.parse(localStorage.getItem('services') || '[]')
    const foundService = services.find(s => s.id === id)
    if (foundService) {
      setService(foundService)
      
      // Load reviews
      const serviceReviews = JSON.parse(localStorage.getItem(`reviews_${id}`) || '[]')
      setReviews(serviceReviews)
    }
  }, [id])

  const handleRatingSubmit = () => {
    if (rating && comment) {
      const newReview = {
        id: Date.now(),
        rating,
        comment,
        date: new Date().toISOString()
      }

      const updatedReviews = [...reviews, newReview]
      setReviews(updatedReviews)
      localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews))

      // Reset form
      setRating(0)
      setComment('')
    }
  }

  if (!service) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const averageRating = reviews.length 
    ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length 
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <button 
        onClick={() => navigate('/services')}
        className="mb-6 flex items-center text-primary hover:text-primary-dark transition-colors"
      >
        <i className="fas fa-arrow-left mr-2"></i>
        Back to Services
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Service Image */}
        <div className="h-64 relative">
          <img 
            src={`/${service.category.toLowerCase().replace(/\s+/g, '_')}.jpg`}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-2 m-4 rounded-full">
            {service.category}
          </div>
        </div>

        {/* Service Details */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-primary mb-4">{service.title}</h1>
          
          <div className="flex items-center mb-6">
            <div className="flex text-secondary">
              {[1, 2, 3, 4, 5].map((star) => (
                <i 
                  key={star}
                  className={`fas fa-star ${star <= averageRating ? 'text-secondary' : 'text-gray-300'}`}
                ></i>
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
            </span>
          </div>

          <p className="text-gray-700 mb-6">{service.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-2">
                <p className="flex items-center">
                  <i className="fas fa-phone mr-3 text-primary"></i>
                  {service.phone1}
                </p>
                {service.phone2 && (
                  <p className="flex items-center">
                    <i className="fas fa-phone mr-3 text-primary"></i>
                    {service.phone2}
                  </p>
                )}
                <p className="flex items-center">
                  <i className="fas fa-envelope mr-3 text-primary"></i>
                  {service.email}
                </p>
                {service.address && (
                  <p className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-3 text-primary"></i>
                    {service.address}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Service Details</h2>
              <div className="space-y-2">
                <p className="flex items-center">
                  <i className="fas fa-tag mr-3 text-primary"></i>
                  {service.serviceName}
                </p>
                <p className="flex items-center">
                  <i className="fas fa-tools mr-3 text-primary"></i>
                  {service.serviceType}
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <ServicesMap services={[service]} height={400} />
          </div>

          {/* Reviews Section */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Reviews</h2>

            {/* Add Review */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-medium mb-4">Add a Review</h3>
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${star <= rating ? 'text-secondary' : 'text-gray-300'} hover:text-secondary focus:outline-none mr-1`}
                  >
                    <i className="fas fa-star"></i>
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                rows="4"
              ></textarea>
              <button
                onClick={handleRatingSubmit}
                className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-md transition duration-150"
              >
                Submit Review
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-secondary">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i 
                          key={star}
                          className={`fas fa-star ${star <= review.rating ? 'text-secondary' : 'text-gray-300'}`}
                        ></i>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-500 text-sm">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails