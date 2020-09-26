import axios from "axios";

const API_URL = 'http://localhost:3060'

const apiClient = axios.create({
    baseURL: API_URL, // TODO: move API_URL to ENV variables
  });

  apiClient.interceptors.response.use((response) => {
    return response.data;
  }, (error) => {
    if (error.message.endsWith('404')) {
      return {statusCode: '404', 
              message: 'No results found'}
    }
    return Promise.reject(error.message);
  });
  
  const { get, post, put, delete: destroy } = apiClient;
  export { get, post, put, destroy };