import { useState, useEffect } from 'react'
import FormInput from '../components/FormInput.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const Account = () => {
  const { user, updateUserInfo } = useAuth()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone1: '',
    phone2: '',
    address: ''
  })

  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    if (user) {
      console.log(localStorage.getItem('auth_id'));
      
      setFormData({
        id: localStorage.getItem('auth_id'),
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        email: user.email || '',
        phone1: user.phone1 || '',
        phone2: user.phone2 || '',
        address: user.address || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
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

    try {
      const success = await updateUserInfo(formData)

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
