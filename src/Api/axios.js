import axios from "axios";
const instance = axios.create({
  // baseURL: "https://myenjaz-backend.onrender.com/api/",
  baseURL: "http://localhost:5500/api/"
 
});
export default instance;
