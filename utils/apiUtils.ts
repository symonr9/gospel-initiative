import axios, { AxiosRequestConfig } from 'axios';

// Create an instance of axios with default configuration
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Ensure this matches your server's endpoint
});

export const getData = async (url: string, config?: AxiosRequestConfig) => {
  try {
    return await axiosInstance.get(url, config);
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return error.response;
  }
};

export const postData = async (url: string, body: any, config?: AxiosRequestConfig) => {
  try {
    return await axiosInstance.post(url, body, config);
  } catch (error: any) {
    console.error('Error posting data:', error);
    return error.response;
  }
};

export const updateAxiosConfig = (newConfig: AxiosRequestConfig) => {
  Object.assign(axiosInstance.defaults, newConfig);
};
