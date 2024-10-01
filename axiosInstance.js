// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api", // Replace with your API URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`; // Attach the token to the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // Handle unauthorized access, e.g., redirect to login or refresh token
//             console.error("Token expired or invalid. Please log in again.");
//             // Optionally, clear the token from local storage
//             localStorage.removeItem("token");
//             // Redirect to login page or handle token refresh logic here
//             window.location.href = "/login";
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
