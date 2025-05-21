import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (identifier, password) => {
    // Check if identifier is an email
    const isEmail = identifier.includes('@')
    
    // Check hardcoded test user
    if (
      (!isEmail && identifier === 'testuser' && password === 'password123') ||
      (isEmail && identifier === 'test@example.com' && password === 'password123')
    ) {
      const testUser = {
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '1234567890'
      }
      
      localStorage.setItem('currentUser', JSON.stringify(testUser))
      setUser(testUser)
      setIsAuthenticated(true)
      return true
    }
    
    // Check localStorage for registered users
    const users = JSON.parse(localStorage.getItem('users')) || []
    const foundUser = users.find(u => 
      (isEmail ? u.email === identifier : u.username === identifier) && 
      u.password === password
    )
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
      setUser(userWithoutPassword)
      setIsAuthenticated(true)
      return true
    }
    
    return false
  }

  // Signup function
  const signup = (newUser) => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    
    // Check if username or email already exists
    if (users.some(user => user.username === newUser.username || user.email === newUser.email)) {
      return false
    }
    
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    return true
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
    setIsAuthenticated(false)
  }

  // Update user info
  const updateUserInfo = (updatedInfo) => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const updatedUsers = users.map(u => u.username === user.username ? { ...u, ...updatedInfo } : u)
    
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    
    const updatedUser = { ...user, ...updatedInfo }
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    setUser(updatedUser)
    
    return true
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      signup,
      updateUserInfo
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

