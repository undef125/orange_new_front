import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://ecommerce-backend-eight.vercel.app/",
    baseURL: "https://web-production-0f16.up.railway.app/",
    // baseURL: "https://ecomorange.herokuapp.com/",
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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
