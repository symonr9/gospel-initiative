import axios, { AxiosRequestConfig } from 'axios';

// Create an instance of axios with default configuration
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Ensure this matches your server's endpoint
});

// Function to get data from an API endpoint
export const getData = async (url: string, config?: AxiosRequestConfig) => {
  try {
    const response = await axiosInstance.get(url, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

// Function to post data to an API endpoint
export const postData = async (url: string, body: any, config?: AxiosRequestConfig) => {
  try {
    const response = await axiosInstance.post(url, body, config);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

// Optionally, you can create a function to update the Axios instance configuration
export const updateAxiosConfig = (newConfig: AxiosRequestConfig) => {
  Object.assign(axiosInstance.defaults, newConfig);
};
