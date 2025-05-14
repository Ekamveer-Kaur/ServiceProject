import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Change as per your backend
});

export default api;
