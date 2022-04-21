// Axios
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// constants
import { ApiUrl } from './APIConstants';

// utils
import { apiErrorHandler } from './helpers';

export const api = axios.create({
  baseURL: ApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  ({ data }: AxiosResponse) => data,
  error => apiErrorHandler(error)
);

api.interceptors.request.use(
  (requestConfig: AxiosRequestConfig) => {
    requestConfig.headers = {};
    return requestConfig;
  },
  error => apiErrorHandler(error)
);
