// src/axiosConfig.js
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Add this line to include the CSRF token
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
