import axios from "axios";
import { getCookie } from "cookies-next";


const axiosInstance = axios.create({
    // baseURL: "https://ecommerce-backend-eight.vercel.app",
    // baseURL: "https://web-production-0f16.up.railway.app/",
    // baseURL: "https://ecomorange.herokuapp.com/",
    // baseURL: "http://192.168.1.85:5000",
  baseURL: "http://192.168.1.85:5000",
  // baseURL: "https://314f-2400-1a00-bd11-f04f-f849-d7f3-a092-98ef.ngrok-free.app",
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
    const token = getCookie('token');
    token ? 
    config.headers.Authorization = `Bearer ${token}` : ''
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

  



