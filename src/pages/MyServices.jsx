import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import FormInput from '../components/FormInput.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { LocationPickerMap } from '../components/Map.jsx'
import { addService, APIServices, getUserServices } from '../data/services.js'
import APICategories from '../data/services.js'
const MyServices = () => {
  const { user, accessToken, setShowDeleteService} = useAuth()
  const [services, setServices] = useState([])
  const [Categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedGlobalService, setSelectedGlobalService] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [availableGlobalServices, setAvailableGlobalServices] = useState([])
  const [availableServices, setAvailableServices] = useState([])
  const [location, setLocation] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    phone1: user?.phone1 || '',
    phone2: user?.phone2 || '',
    email: user?.email || '',
    address: user?.address || '',
    workDays: '',
    workHours: ''
  })
  const [workDays, setWorkDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  })
  const [workHours, setWorkHours] = useState({
    start: '',
    end: ''
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({ type: '', text: '' })
  const fetchcategories = async () => {
    const Categories = await APICategories(true);
    console.log('the categories', Categories);
    setCategories(Categories);
  }
  useEffect(() => {
    fetchcategories();
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

  useEffect(() => {
    if (selectedCategory) {
      const category = Categories.find(c => c.id === selectedCategory)
      console.log('categorie:', category);
      console.log('categories:', Categories);

      setAvailableGlobalServices(category ? category.globalservices : [])
      setSelectedGlobalService('')
      setAvailableServices([])
    } else {
      setAvailableGlobalServices([])
      setSelectedGlobalService('')
      setAvailableServices([])
    }
  }, [selectedCategory])
  const fetchservices = async () => {
    const services = await APIServices(null, selectedGlobalService);
    console.log('sub global services:', services);
    setAvailableServices(services);
  }
  useEffect(() => {
    fetchservices();
  }, [selectedCategory, selectedGlobalService])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleWorkDayChange = (day) => {
    setWorkDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }))
  }

  const handleWorkHourChange = (type, value) => {
    setWorkHours(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const handleLocationSelect = (newLocation) => {
    setLocation(newLocation)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!selectedCategory) {
      newErrors.category = 'Please select a category'
    }

    if (!selectedGlobalService) {
      newErrors.serviceName = 'Please select a service'
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.phone1.trim()) {
      newErrors.phone1 = 'Primary phone number is required'
    }

    if (!Object.values(workDays).some(day => day)) {
      newErrors.workDays = 'Select at least one work day'
    }

    if (!workHours.start || !workHours.end) {
      newErrors.workHours = 'Both start and end time are required'
    }

    if (!location || !location.lat || !location.lng) {
      newErrors.location = 'Please select a location on the map'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      const selectedDays = Object.entries(workDays)
        .filter(([_, isSelected]) => isSelected)
        .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
        .join(', ')

      const newService = {
        user_id: user.id,
        category_id: selectedCategory,
        global_service_id: selectedGlobalService,
        initial_service_id: selectedService,
        title: formData.title,
        type: 'freelance',
        status: 'busy',
        description: formData.description,
        workDays: selectedDays,
        workHours: `${workHours.start} - ${workHours.end}`,
        lat: 1.643,
        lng: 5.634,
        // location: location
      }

      await addService(newService, accessToken);
      await fetchuserservices();

      setShowForm(false)
      setSelectedCategory('')
      setSelectedGlobalService('')
      setFormData({
        title: '',
        description: '',
        phone1: user?.phone1 || '',
        phone2: user?.phone2 || '',
        email: user?.email || '',
        address: user?.address || '',
        workDays: '',
        workHours: ''
      })
      setLocation(null)

      setMessage({
        type: 'success',
        text: 'Your service has been created successfully!'
      })

      setTimeout(() => {
        setMessage({ type: '', text: '' })
      }, 3000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center mb-8">
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
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">Create a New Service</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormInput
              label="Category"
              name="category"
              type="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
              required
              error={errors.category}
            >
              <option value="">Select a category</option>
              {Categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </FormInput>

            <FormInput
              label="Global Service"
              name="globalserviceName"
              type="select"
              value={selectedGlobalService}
              onChange={(e) => setSelectedGlobalService(parseInt(e.target.value))}
              required
              disabled={!selectedCategory}
              error={errors.serviceName}
            >
              <option value="">Select a global service</option>
              {availableGlobalServices.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </FormInput>
          </div>

          <FormInput
            label="Service"
            value={selectedService}
            onChange={(e) => setSelectedService(parseInt(e.target.value))}
            name="service"
            id="service"
            type="select"
            disabled={!selectedGlobalService}
          >
            <option value="">Select a service</option>
            {availableServices.map(service => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </FormInput>

          <FormInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="E.g., Professional Plumbing Services"
            required
            error={errors.title}
          />

          <FormInput
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your service..."
            required
            rows={4}
            error={errors.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Primary Phone"
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              placeholder="Your contact number"
              required
              error={errors.phone1}
            />

            <FormInput
              label="Secondary Phone (Optional)"
              name="phone2"
              value={formData.phone2}
              onChange={handleChange}
              placeholder="Alternative contact number"
            />
          </div>

          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            required
          />

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Days <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(workDays).map(([day, isChecked]) => (
                <label
                  key={day}
                  className={`flex items-center justify-center p-3 rounded-lg cursor-pointer border transition-colors ${isChecked
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleWorkDayChange(day)}
                    className="hidden"
                  />
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </label>
              ))}
            </div>
            {errors.workDays && (
              <p className="mt-1 text-sm text-red-500">{errors.workDays}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={workHours.start}
                onChange={(e) => handleWorkHourChange('start', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={workHours.end}
                onChange={(e) => handleWorkHourChange('end', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            {errors.workHours && (
              <p className="col-span-2 mt-1 text-sm text-red-500">{errors.workHours}</p>
            )}
          </div>

          <FormInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your business address"
          />

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Click on the map to set your service location
            </p>

            <LocationPickerMap
              initialPosition={location}
              onLocationSelected={handleLocationSelect}
            />

            {errors.location && (
              <p className="mt-1 text-sm text-red-500">{errors.location}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-[#3B5BFF] hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md transition duration-150"
            >
              Create Service
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-6">My Created Services</h2>
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
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