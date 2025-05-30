import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  
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
  
  const handleSubmit = () => {
    setError('')
    
    // Basic validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please enter both username and password')
      return
    }
    
    // Try to login
    const success = login(formData.username, formData.password)
    
    if (success) {
      console.log('Login successful')
      navigate('/')
    } else {
      console.log('Login failed')
      setError('Invalid username or password')
    }
  }
  
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-royal-blue mb-6 text-center">Log In</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <FormInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
        
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition duration-150 mt-4"
        >
          Log In
        </button>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-royal-blue hover:text-royal-gold">
              Create an Account
            </Link>
          </p>
          
        </div>
      </div>
    </div>
  )
}

export default Login