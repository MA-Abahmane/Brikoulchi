import axios from "axios";
export default function setupInterceptors(Api, { setAccessToken, setIsAuthenticated }) {
    Api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401) {
            try {
                const res = await axios.post('http://localhost:8000/api/auth/refresh', {}, {
                    withCredentials: true,
                });
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
}