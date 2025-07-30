import { createContext, useContext, useState, useEffect } from 'react';
import BrikoulchiApi from '../api/BrikoulchiApi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import setupInterceptors from '../api/interceptors/setupInterceptors';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
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
          setUser(res.data.user ?? null);
          setAccessToken(res.data.access_token)
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        setUser(false);
        localStorage.removeItem('user');
      }
    };

    checkAuth();
    setUser(JSON.parse(localStorage.getItem('user')));
    setupInterceptors(BrikoulchiApi, { setIsAuthenticated, setAccessToken })
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
      console.log(user);
      setIsAuthenticated(false);
      setUser(null);

      localStorage.removeItem('user');
      localStorage.removeItem('profile_info_update');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateUserInfo = async (updatedInfo) => {
    try {
      for (let pair of updatedInfo.entries()){
        console.log(pair[0] + ':::' ,  pair[1]);
      }
      const res = await BrikoulchiApi.post(`/api/updateUserInfo/${user.id}`, updatedInfo, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('User updated:', res.data);
      return true;
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
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
