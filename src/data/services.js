// Service categories and subcategories data

import axios from "axios"
import BrikoulchiApi from "../api/BrikoulchiApi";
import { useAuth } from "../context/AuthContext";
// export default function hello(){
//     return 0;
// }
export async function APICategories(withGlobalServices = false) {
    try {
        const url = withGlobalServices ? `http://127.0.0.1:8000/api/Categories/${withGlobalServices}` :
        "http://127.0.0.1:8000/api/Categories";
        const res = await axios.get(url);
        return res.data;
    }
    catch (error) {
        console.log(error.message);
    }
}
export async function APIServices(userId = null, globalserviceId = null) {
    try {
        let url = userId
            ? `http://127.0.0.1:8000/api/Services/${userId}`
            : globalserviceId
                ? `http://127.0.0.1:8000/api/GServices/${globalserviceId}`
                : `http://127.0.0.1:8000/api/Services`;
        const res = await BrikoulchiApi.get(url);
        console.log(globalserviceId, 'this the golobal service id', res);
        // console.log('userID', userId);
        // console.log('globalID', globalserviceId);
        return res.data;
    } catch (error) {
        console.log(error.message + "fetching services error");
    }
}
export async function getInitialServices(userId = null) {
    return APIServices(userId);
}
export default async function getInitialCategories(withGlobalServices) {
    return APICategories(withGlobalServices);
}
// Function to add a new service
export const addService = async (service, accessToken) => {
    console.log('created service:', service);

    try {
        const res = await BrikoulchiApi.post('/api/auth/create/service', service, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log('service test created: ', res.data);
        return res.data
    } catch (error) {
        console.log('Error while creating the service:', error.message);
    }
}
export const remouveService = async (serviceId, accessToken, userId) => {
    console.log("huhuuh");
    try {
        console.log('testttes');
        const res = await BrikoulchiApi.post(`/api/auth/delete/service/${serviceId}`, { userId }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log('the service has been deleted sucessfully', res);
        return true;
    } catch {
        console.log('Error can\'t delete that service');
        return false;
    }
}
export const editService = async (serviceId, accessToken, userId, service) => {
    console.log("huhuuh");
    try {
        console.log('testttes', 'edit service');
        const res = await BrikoulchiApi.post(`/api/auth/edit/service/${serviceId}`, { userId, service }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log('the service has been edited sucessfully', res);
        return true;
    } catch {
        console.log('Error can\'t edit that service');
        return false;
    }
}
// Function to get services by userId
export const getUserServices = (userId) => {
    const services = getInitialServices(userId);
    return services
}

// Function to get services by category
export const getServicesByCategory = async (catname) => {
    if (catname === "All Services") {
        return getInitialServices();
    }
    const services = await getInitialServices()

    // console.log('services page');
    // console.log(services);

    return services.filter(service => service.category.name === catname)
}