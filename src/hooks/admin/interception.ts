import axios from "axios";
import Cookies from "js-cookie"; // Assuming you're using js-cookie for cookie management

// Create an instance of Axios
const axiosUserInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Set your API base URL here
});

// Request interceptor to add the Authorization header
axiosUserInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access_token"); // Retrieve the access_token from cookies
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Attach the access_token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 Unauthorized responses
axiosUserInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to "/auth/login" upon receiving a 401 status code
      window.location.href = "/medical-dashboard/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axiosUserInstance;
