import axios from 'axios';
import Cookies from 'js-cookie';

// Create Axios instance
const authAxios = axios.create();

// Add a request interceptor to attach the token to every request
authAxios.interceptors.request.use(
  (config) => {
    // Get the token from cookies
    const token = Cookies.get('token');

    // Attach the token to the request headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default authAxios;
