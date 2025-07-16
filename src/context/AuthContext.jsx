import { createContext, useContext, useState, useEffect } from 'react';
import BrikoulchiApi from '../api/BrikoulchiApi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  // Auto-check if user is authenticated when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is authenticated
        const res = await axios.post('http://localhost:8000/api/auth/refresh', {}, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log('check');
        console.log(res);

        if (res.statusText === 'OK') {
          console.log('checkAuth');

          setIsAuthenticated(true);
          setUsername(res.data.username ?? null);
          setAccessToken(res.data.access_token)
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);
  const signup = async (newUser) => {
    try {
      await BrikoulchiApi.post('/api/auth/register', newUser);
      console.log('Signup successful');
      navigate('/');
      return true;
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out...');

      await BrikoulchiApi.post(
        '/api/auth/logout',
        {}, // Empty body (POST requests need either data or `null`)
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Fixed: Added space after "Bearer"
          },
        }
      );

      setIsAuthenticated(false);
      setUsername(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateUserInfo = async (updatedInfo) => {
    try {
      const res = await BrikoulchiApi.put('/api/updateUserInfo', updatedInfo);
      console.log('User updated:', res.data);
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        setIsAuthenticated,
        setAccessToken,
        logout,
        signup,
        updateUserInfo,
        accessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
