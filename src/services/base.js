import axios from "axios";

const API_URL = 'http://localhost:3060'

const apiClient = axios.create({
    baseURL: API_URL, // TODO: move API_URL to ENV variables
  });

  apiClient.interceptors.response.use((response) => {
    return {data: response.data, status: response.status};
  }, (error) => {
    if (error.message.endsWith('404')) {
      return {status: 404, 
              message: 'No results found'}
    }
    if (error.message.endsWith('400')) {
      return {status: 400, 
              message: 'Bad request'}
    }
    return Promise.reject(error.message);
  });
  
  const { get, post, put, delete: destroy } = apiClient;
  export { get, post, put, destroy };