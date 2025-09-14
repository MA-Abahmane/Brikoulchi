import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { getUserServices, remouveService } from '../data/services.js'
import ConfirmationBox from '../components/ConfirmationBox.jsx'
import ServiceForm from '../components/ServiceForm.jsx'
const MyServices = () => {
  const { user, accessToken, setShowDeleteService } = useAuth()
  const [services, setServices] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [deletedServiceId, setDeletedServiceId] = useState([])
  const [showConfirmBox, setShowConfirmBox] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    setShowDeleteService(true);
  }, [])
  const fetchuserservices = async () => {
    const userServices = await getUserServices(user.id)
    console.log('my services', userServices);
    setServices(userServices)
  }
  useEffect(() => {
    if (user) {
      fetchuserservices();
    }
  }, [user])

  const RemouveService = async (serviceId) => {
    const res = await remouveService(serviceId, accessToken, user.id);
    if (res) {
      fetchuserservices();
    }
    return res;
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      {showConfirmBox && <ConfirmationBox message={'are you shure you want to delete this service'} onConfirm={() => { setShowConfirmBox(false); RemouveService(deletedServiceId) }} onCancel={() => { setShowConfirmBox(false) }} />}      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-royal-blue">My Services</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#3B5BFF] hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md transition duration-150"
        >
          {showForm ? 'Cancel' : 'Create New Service'}
        </button>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-md mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
        >
          {message.text}
        </div>
      )}

      {showForm && (
        <ServiceForm fetchuserservices={fetchuserservices} setShowForm={setShowForm} setMessage = {setMessage}/>
      )}

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-6">My Created Services</h2>
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(service => (
              <ServiceCard setDeletedServiceId={setDeletedServiceId} setShowConfirmBox={setShowConfirmBox} key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">You haven't created any services yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyServices