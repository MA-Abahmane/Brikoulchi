import { useAuth } from "../context/AuthContext";
export default function getToken(){
    const {accessToken} = useAuth();
    return accessToken;
}