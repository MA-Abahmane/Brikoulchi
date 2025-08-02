import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ServicesMap } from '../components/Map.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getInitialServices } from '../data/services.js'

const ServiceDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth();
  const [service, setService] = useState(null);
  const [provider, setProvider] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchservices = async () => {
      const services = await getInitialServices();
      const foundService = services.find(s => s.id === parseInt(id))
      console.log('reviews ::::::::::::::::::::::::', foundService);
      if (foundService) {
        setService(foundService)
        setProvider(foundService.user);
        console.log('servs$$$$$$$$$$$$$$$$$$$$$$$$$$', service);
        setReviews(foundService.reviews);
      }
    }
    fetchservices();
    console.log('revs$$$$$$$$$$$$$$$$$$$$$$$$$$', reviews);
  }, [id])

  const handleRatingSubmit = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (rating && comment) {
      const newReview = {
        id: Date.now(),
        userId: user.username,
        rating,
        comment,
        date: new Date().toISOString()
      }

      const updatedReviews = [...reviews, {
        ...newReview,
        userInfo: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.profileImage
        }
      }]
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
            src={`/${service.category.name.toLowerCase().replace(/\s+/g, '_')}.jpg`}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 bg-primary text-white px-4 py-2 m-4 rounded-full">
            {service.category.name}
          </div>
        </div>

        {/* Service Details */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-primary mb-4">{service.title}</h1>

          {/* Provider Info */}
          {provider && (
            <div className="flex items-center justify-between mb-6 bg-gray-50 p-3 rounded-lg">
              <Link
                to={`/user/${provider.username}`}
                className="flex items-center hover:bg-gray-100 p-3 rounded-lg transition-colors"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {provider.firstName?.charAt(0)}{provider.lastName?.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-800">
                    {provider.firstName} {provider.lastName}
                  </div>
                  <div className="text-sm text-gray-600">View Provider Profile</div>
                </div>
              </Link>
              {isAuthenticated && user?.username !== provider.username && (
                <Link
                  to="/webchat"
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <i className="fas fa-comments mr-2"></i>
                  Chat with Provider
                </Link>
              )}
            </div>
          )}

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
                {service.workDays && (
                  <p className="flex items-center">
                    <i className="fas fa-calendar mr-3 text-primary"></i>
                    Working Days: {service.workDays}
                  </p>
                )}
                {service.workHours && (
                  <p className="flex items-center">
                    <i className="fas fa-clock mr-3 text-primary"></i>
                    Working Hours: {service.workHours}
                  </p>
                )}
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
              {isAuthenticated ? (
                <>
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
                </>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Please log in to leave a review</p>
                  <Link
                    to="/login"
                    className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-md transition duration-150"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="flex text-secondary">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i
                            key={star}
                            className={`fas fa-star ${star <= review.rating ? 'text-secondary' : 'text-gray-300'}`}
                          ></i>
                        ))}
                      </div>
                      {review.userInfo && (
                        <div className="ml-4 flex items-center">
                          {review.userInfo.profileImage ? (
                            <img
                              src={review.userInfo.profileImage}
                              alt={`${review.userInfo.firstName} ${review.userInfo.lastName}`}
                              className="w-8 h-8 rounded-full object-cover mr-2"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm mr-2">
                              {review.userInfo.firstName[0]}{review.userInfo.lastName[0]}
                            </div>
                          )}
                          <Link
                            to={`/user/${review.userInfo.username}`}
                            className="font-medium text-primary hover:text-primary-dark"
                          >
                            {review.userInfo.firstName} {review.userInfo.lastName}
                          </Link>
                        </div>
                      )}
                    </div>
                    <span className="text-gray-500 text-sm">
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