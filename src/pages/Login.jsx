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
  const [isLoading, setIsLoading] = useState(false)
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
  
  const handleSubmit = async () => {
    setError('')
    setIsLoading(true)
    
    // Basic validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please enter both username and password')
      setIsLoading(false)
      return
    }
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Try to login
    const success = login(formData.username, formData.password)
    
    if (success) {
      navigate('/')
    } else {
      setError('Invalid username or password')
    }
    
    setIsLoading(false)
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-sign-in-alt text-2xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 flex items-center">
              <i className="fas fa-exclamation-circle mr-3"></i>
              {error}
            </div>
          )}
          
          <FormInput
            label="Username or Email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username or email"
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
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-secondary font-semibold transition-colors">
                Create Account
              </Link>
            </p>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-2">Demo Account:</p>
              <p className="text-xs text-gray-600">
                <strong>Username:</strong> testuser<br />
                <strong>Password:</strong> password123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login