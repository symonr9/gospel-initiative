import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
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
