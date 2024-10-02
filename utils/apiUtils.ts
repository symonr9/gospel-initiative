import axios, { AxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';

const axiosInstance = axios.create({
    baseURL: Constants.expoConfig?.extra?.serverUrl,
    timeout: 5000,
});

export const getData = async (url: string, config?: AxiosRequestConfig) => {
  try {
    return await axiosInstance.get(url, { 
      ...config, 
      headers: { 
        ...config?.headers,
        fixed_auth_token: Constants.expoConfig?.extra?.fixedAuthToken, 
      } 
    });
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return error.response;
  }
};

export const postData = async (url: string, body: any, config?: AxiosRequestConfig) => {
  try {
    return await axiosInstance.post(url, body, { 
      ...config, 
      headers: { 
        ...config?.headers, 
        fixed_auth_token: Constants.expoConfig?.extra?.fixedAuthToken, 
      } 
    });
  } catch (error: any) {
    console.error('Error posting data:', error);
    return error.response;
  }
};

export const updateAxiosConfig = (newConfig: AxiosRequestConfig) => {
  Object.assign(axiosInstance.defaults, newConfig);
};
