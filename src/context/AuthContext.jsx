import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const setlogin = async (username, password) => {
    //   // Check if identifier is an email
    //   const isEmail = identifier.includes('@')
    console.log('im here');
    setIsAuthenticated(true);
    //   // Check hardcoded test user
    //   if (
    //     (!isEmail && identifier === 'testuser' && password === 'password123') ||
    //     (isEmail && identifier === 'test@example.com' && password === 'password123')
    //   ) {
    const name = username.match(/^([^@]+)/)[1];
    const User = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone1: '',
      phone2: '',
      password: '',
      confirmPassword: ''
    }
    console.log("dd" + localStorage.getItem('auth_token'));
    localStorage.setItem('currentUser', JSON.stringify(User))
    setUser(User)
    setIsAuthenticated(true)
    return true
  }

  //   // Check localStorage for registered users
  //   const users = JSON.parse(localStorage.getItem('users')) || []
  //   const foundUser = users.find(u => 
  //     (isEmail ? u.email === identifier : u.username === identifier) && 
  //     u.password === password
  //   )

  //   if (foundUser) {
  //     const { password, ...userWithoutPassword } = foundUser
  //     localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
  //     setUser(userWithoutPassword)
  // setIsAuthenticated(true)
  //     return true
  //   }

  //   return false
  // }

  // // Signup function
  const signup = async (newUser) => {
    //   const users = JSON.parse(localStorage.getItem('users')) || []

    //   // Check if username or email already exists
    //   if (users.some(user => user.username === newUser.username || user.email === newUser.email)) {
    //     return false
    //   }

    //   users.push(newUser)
    //   localStorage.setItem('users', JSON.stringify(users))
    //   return true

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register', newUser, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      // Save token to localStorage
      console.log('signup successful')
      navigate('/login')
      return true;
    } catch (error) {
      throw (error);
    }
  }

  const logout = async () => {
    // localStorage.removeItem('auth_token'); // Clear the stored token
    //   localStorage.removeItem('currentUser')
    //   setUser(null)
    //   setIsAuthenticated(false)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data.message); // "Successfully logged out"
      localStorage.removeItem('auth_token'); // Clear the stored token
      localStorage.removeItem('currentUser')
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout failed:', error.response.data);
    }
  };

  // // Update user info
  const updateUserInfo = async (updatedInfo) => {
    //   const users = JSON.parse(localStorage.getItem('users')) || []
    //   const updatedUsers = users.map(u => u.username === user.username ? { ...u, ...updatedInfo } : u)

    //   localStorage.setItem('users', JSON.stringify(updatedUsers))

    //   const updatedUser = { ...user, ...updatedInfo }
    //   localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    //   setUser(updatedUser)

    //   return true
    const res = await axios.put('http://127.0.0.1:8000/api/updateUserInfo', updatedInfo, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

    })
    console.log(res);
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      setlogin,
      logout,
      signup,
      updateUserInfo
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

