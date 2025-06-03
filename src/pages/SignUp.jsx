import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const SignUp = () => {
  const { signup, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState({})
  
  // Redirect if already logged in
  if (isAuthenticated) {
    navigate('/')
    return null
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Phone validation
    const phoneRegex = /^\d{10,15}$/
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Phone must be 10-15 digits'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = () => {
    if (validateForm()) {      
      const success = signup({
        ...formData,
      })
      
      if (success) {
        console.log('Signup successful')
      } else {
        setErrors({
          form: 'Username or email already exists'
        })
      }
    }
  }
  
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-royal-blue mb-6 text-center">Create an Account</h1>
        
        {errors.form && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
            {errors.form}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            required
            error={errors.firstName}
          />
          
          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
            error={errors.lastName}
          />
        </div>
        
        <FormInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="johndoe"
          required
          error={errors.username}
        />
        
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
          error={errors.email}
        />
        
        <FormInput
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="1234567890"
          required
          error={errors.phone}
        />
        
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="At least 8 characters"
          required
          error={errors.password}
        />
        
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
          error={errors.confirmPassword}
        />
        
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition duration-150 mt-4"
        >
          Sign Up
        </button>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-royal-blue hover:text-royal-gold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp