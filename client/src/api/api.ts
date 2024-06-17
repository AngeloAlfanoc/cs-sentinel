import axios from 'axios';
import { UserToken } from '../types/user';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v2', // Replace this with your API base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storedData = localStorage.getItem('user'); // Use 'user' as this is the key where your token and user info are stored

    if (storedData) {
      const { token } = JSON.parse(storedData) as UserToken; // Use type assertion here

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
