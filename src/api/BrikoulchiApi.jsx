import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import getToken from '../utils/auth';
const BrikoulchiApi = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
    },
});

// Request interceptor
BrikoulchiApi.interceptors.request.use(
    (config) => {
        console.log('Making request to:', config.baseURL + config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
BrikoulchiApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            console.log('Unauthorized access');
        }
        return Promise.reject(error);
    }
);
BrikoulchiApi.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401) {
            try {
                const res = await axios.post('http://localhost:8000/api/auth/refresh', {}, {
                    withCredentials: true,
                });
                const { setAccessToken, setIsAuthenticated, } = useAuth();
                const newToken = res.data.access_token;
                setAccessToken(newToken);
                setIsAuthenticated(true);
                error.config.headers['Authorization'] = `Bearer ${newToken}`;
                return axios(error.config);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export default BrikoulchiApi;