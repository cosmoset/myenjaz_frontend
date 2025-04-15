import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  // baseURL: "https://myenjaz-backend.onrender.com/api/",
  // baseURL: "http://localhost:5500/api/",
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,  
});

export default instance;