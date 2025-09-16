import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ServicesMap } from '../components/Map.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { editService, getInitialServices } from '../data/services.js'
import BrikoulchiApi from '../api/BrikoulchiApi.jsx'
import { remouveService } from '../data/services.js'
import ConfirmationBox from '../components/ConfirmationBox.jsx'
import ServiceForm from '../components/ServiceForm.jsx'
const ServiceDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user, accessToken, showDeleteService, setShowDeleteService, message } = useAuth();
  const [service, setService] = useState(null);
  const [provider, setProvider] = useState(null);
  const [rating, setRating] = useState(0);
  const [text, settext] = useState('');
  const [reviews, setReviews] = useState([]);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [showEditService, setShowEditService] = useState(false);
  const like = useRef(false);
  const fetchservices = async () => {
    const services = await getInitialServices();
    const foundService = services.find(s => s.id === parseInt(id))
    if (foundService) {
      setService(foundService)
      setProvider(foundService.user);
    }
  }
  useEffect(() => {
    fetchservices();
  }, [id]);
  const fetchreviews = async () => {
    try {
      const res = await BrikoulchiApi(`/api/Service/reviews/${id}`)
      if (res.data) {
        setReviews(res.data)
      }
      return true;
    } catch (error) {
      console.log('error while fetching the reviwes of this service', error.message);
      return false;
    }
  }
  useEffect(() => {
    fetchreviews();
  }, [id, like]);
  useEffect(() => {
    if ((user && service) && (user.id === service.user_id)) {
      setShowDeleteService(true);
    }
  });
  const handleRatingSubmit = async () => {

    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    console.log('test submmit');
    if (rating && text) {
      const newReview = {
        service_id: service.id,
        user_id: user.id,
        rating,
        text,
      }

      try {
        const res = await BrikoulchiApi.post('/api/auth/createReview', newReview, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });

        fetchreviews();
        settext('');
        setRating(0);
        return res;

      } catch (error) {
        console.log('error', error.message);
      }
    }
  }
  const RemouveService = async (serviceId) => {
    const res = await remouveService(serviceId, accessToken, user.id);
    res ? navigate('/my-services') : '';
    return res;
  }
  const EditService = async (serviceId) => {
    const res = await editService(serviceId, accessToken, user.id, newServiceInfo);
    return res;
  }
  const ReactWithLike = async (reviewId) => {
    try {
      const res = await BrikoulchiApi.post(`/api/auth/ReactWithLike/${reviewId}`, { like: like.current, userId: user.id }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      fetchreviews();
      return true;
    } catch (error) {
      console.log('Error:', error);
    }
  }
  const RmouveReview = async (reviewId) => {
    try {
      const res = await BrikoulchiApi.post(`api/auth/RemouveReview/${reviewId}`, { userId: user.id }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      fetchreviews();
      return true;
    } catch (error) {
      console.log('Error:', error);
      return false;
    }
  }
  if (!user || !service) {
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

      {showConfirmBox && <ConfirmationBox message={'are you shure you want to delete this service'} onConfirm={() => { setShowConfirmBox(false); RemouveService(service.id) }} onCancel={() => { setShowConfirmBox(false) }} />}
      <button
        onClick={() => navigate('/services')}
        className="mb-6 flex items-center text-primary hover:text-primary-dark transition-colors"
      >
        <i className="fas fa-arrow-left mr-2"></i>
        Back to Services
      </button>
      {message.text && (
        <div
          className={`p-4 rounded-md mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
        >
          {message.text}
        </div>
      )}
      {!showEditService ? <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                  {service.user.phone1}
                </p>
                {service.phone2 && (
                  <p className="flex items-center">
                    <i className="fas fa-phone mr-3 text-primary"></i>
                    {service.user.phone2}
                  </p>
                )}
                <p className="flex items-center">
                  <i className="fas fa-envelope mr-3 text-primary"></i>
                  {service.user.email}
                </p>
                {service.user.address && (
                  <p className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-3 text-primary"></i>
                    {service.user.address}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Service Details</h2>
              <div className="space-y-2">
                <p className="flex items-center">
                  <i className="fas fa-tag mr-3 text-primary"></i>
                  {service.name}
                </p>
                <p className="flex items-center">
                  <i className="fas fa-tools mr-3 text-primary"></i>
                  {service.type}
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
            {!(isAuthenticated && showDeleteService) && <div className="bg-gray-50 p-6 rounded-lg mb-8">
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
                    value={text}
                    onChange={(e) => settext(e.target.value)}
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
            </div>}

            {/* Reviews List */}
            {reviews.length ? <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-1 items-center">

                      {review.user && (
                        <div className="ml-4 flex items-center">
                          {review.user.image ? (
                            <img
                              src={review.user.image}
                              alt={`${review.user.firstName} ${review.user.lastName}`}
                              className="w-8 h-8 rounded-full object-cover mr-2"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm mr-2">
                              {review.user.firstName[0]}{review.user.lastName[0]}
                            </div>
                          )}
                          <Link
                            to={`/user/${review.user.username}`}
                            className="font-medium text-primary hover:text-primary-dark"
                          >
                            {review.user.firstName} {review.user.lastName}
                          </Link>
                        </div>
                      )}
                      <div className="flex ml-3 text-secondary">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i
                            key={star}
                            className={`fas fa-star ${star <= review.rating ? 'text-secondary' : 'text-gray-300'}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    {review.user_id === user.id && <button onClick={() => { RmouveReview(review.id) }} className='mr-3 '><i className='fas fa-times text-gray-400 hover:text-gray-600 transition duration-150'></i></button>}
                    <span className="text-gray-500 text-sm">
                      {new Date(review.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                  <div>
                    <button onClick={() => { like.current = !review.liked_by_users.some((u) => u.id === user.id); ReactWithLike(review.id) }}>
                      {review.liked_by_users.some((u) => u.id === user.id) ? <i className='fas fa-thumbs-up text-blue-600 hover:text-blue-700 transition duration-150'></i> :
                        <i className='fas fa-thumbs-up text-gray-300 hover:text-gray-500 transition duration-150'></i>}
                    </button>
                    <span className='text-gray-400'> {review.like_count}</span>
                  </div>
                </div>
              ))}
            </div> : <div className='text-gray-500 mx-4'>No reviviews for this service</div>}
          </div>
        </div>
        {(isAuthenticated && showDeleteService) && <div>
          <button onClick={() => { setShowEditService(true) }}>
            <div className="bg-blue-600 text-white px-4 py-2 ml-8 rounded-full hover:bg-blue-500 transition duration-150">
              edit service
            </div>
          </button>
          <button onClick={() => { setShowConfirmBox(true) }}>
            <div className="bg-red-600 text-white px-4 py-2 m-2 mb-4 rounded-full hover:bg-red-500 transition duration-150">
              delete service
            </div>
          </button>

        </div>}
      </div> :
        <div>
          <ServiceForm setShowEditService={setShowEditService} service={service} editmode={true} />
        </div>}
    </div>
  )
}

export default ServiceDetails