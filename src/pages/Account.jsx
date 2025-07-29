import { useState, useEffect, useRef } from 'react'
import FormInput from '../components/FormInput.jsx'
import { useAuth } from '../context/AuthContext.jsx'
const Account = () => {
  const { user, updateUserInfo } = useAuth()

  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone1: '',
    phone2: '',
    address: '',
    image: ''
  })

  const [message, setMessage] = useState({ type: '', text: '' })
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (user) {

      setFormData({
        id: user.id || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        email: user.email || '',
        phone1: user.phone1 || '',
        phone2: user.phone2 || '',
        address: user.address || '',
      })
      setImagePreview(user.image || null)
    }
    
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          type: 'error',
          text: 'Image size must be less than 5MB'
        })
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setMessage({
          type: 'error',
          text: 'Please select a valid image file'
        })
        return
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setFormData(prev => ({
      ...prev,
      image: ''
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone1) {
      setMessage({
        type: 'error',
        text: 'Required fields must be filled'
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid email address'
      })
      return
    }

    // Phone validation (only digits, 10–15)
    const phoneRegex = /^\d{10,15}$/
    if (!phoneRegex.test(formData.phone1.replace(/\D/g, ''))) {
      setMessage({
        type: 'error',
        text: 'Primary phone must be 10-15 digits'
      })
      return
    }

    if (formData.phone2 && !phoneRegex.test(formData.phone2.replace(/\D/g, ''))) {
      setMessage({
        type: 'error',
        text: 'Secondary phone must be 10-15 digits'
      })
      return
    }

    const data = new FormData()
    for (const key in formData) {
      data.append(key, formData[key])
    }
    if (imageFile) {
      data.append('image', imageFile)
    }
    console.log('form data :', formData);
    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    } try {
      const success = await updateUserInfo(data)

      if (success) {
        setMessage({
          type: 'success',
          text: 'Your information has been updated successfully!'
        })
      } else {
        setMessage({
          type: 'error',
          text: 'Failed to update your information. Please try again.'
        })
      }
    } catch (error) {
      console.error(error)
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred.'
      })
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-royal-blue mb-6">Account Information</h1>

        {message.text && (
          <div
            className={`p-4 rounded-md mb-6 ${message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
              }`}
          >
            {message.text}
          </div>
        )}

        {/* Profile Image Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Profile Image
          </label>
          <div className="flex items-center space-x-6">
            <div className="relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200">
                  <i className="fas fa-user text-gray-400 text-2xl"></i>
                </div>
              )}
              {imagePreview && (
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              )}
            </div>
            <div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors"
              >
                {imagePreview ? 'Change Image' : 'Upload Image'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <p className="text-sm text-gray-500 mt-2">
                JPG, PNG or GIF. Max size 5MB.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Primary Phone"
            name="phone1"
            value={formData.phone1}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Secondary Phone (Optional)"
            name="phone2"
            value={formData.phone2}
            onChange={handleChange}
          />
        </div>

        <FormInput
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-[#3B5BFF] hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md transition duration-150"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Account
