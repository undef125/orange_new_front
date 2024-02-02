import axios from "axios";
import { getCookie } from "cookies-next";


const token = getCookie('token')
console.log(token)
const axiosInstance = axios.create({
    baseURL: "https://ecommerce-backend-eight.vercel.app/",
    // baseURL: "https://web-production-0f16.up.railway.app/",
    // baseURL: "https://ecomorange.herokuapp.com/",
    // baseURL: "http://192.168.1.85:5000",
  // baseURL: "http://localhost:5000",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.request.use(
  (config) => {
    token ? 
    config.headers.Authorization = `Bearer ${token}` : ''
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
