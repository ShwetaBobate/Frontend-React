import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-express-tawny.vercel.app/",  // ⭐ Your backend URL
});

// Add token automatically to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }


  return config;
});

export default API;

