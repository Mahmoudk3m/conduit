import API_URL from "@/config";
import Axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = Cookies.get("token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
}

export const axiosClient = Axios.create({
  baseURL: API_URL
});

axiosClient.interceptors.request.use(authRequestInterceptor);
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
