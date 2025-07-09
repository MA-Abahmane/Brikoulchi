import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BrikoulchiApi from '../api/BrikoulchiApi'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    const getIsAuth = async () => {
      const res = await BrikoulchiApi('/auth/isAuthenticated');
      setIsAuthenticated(res);
      getIsAuth();
    }
  }, []);

  const setlogin = async (username, password) => {
    console.log('im here');
    // setIsAuthenticated(true);
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
    localStorage.setItem('currentUser', JSON.stringify(User))
    setUsername(User)
    // setIsAuthenticated(true)
    return true
  }


  const signup = async (newUser) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register', newUser, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      console.log('signup successful')
      navigate('/login')
      return true;
    } catch (error) {
      throw (error);
    }
  }

  const logout = async () => {
    try {
      const response = await BrikoulchiApi.post(`/auth/logout`, {}, {
      });
      console.log(response.data.message); // "Successfully logged out"
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout failed:', error.response.data);
    }
  };

  // // Update user info
  const updateUserInfo = async (updatedInfo) => {
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
      username,
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

