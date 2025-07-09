import axios from "axios";

const BrikoulchiApi = axios.create(
    {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true,
        headers:{
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    }
)
export default BrikoulchiApi;