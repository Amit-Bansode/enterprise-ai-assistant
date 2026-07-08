import axios from 'axios';

import { appConfig } from '@/core/config/appConfig';

export const apiClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);
