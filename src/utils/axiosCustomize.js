import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";
import { notification } from "antd";

NProgress.configure({ showSpinner: false, trickleSpeed: 400 });

const instance = axios.create({
  baseURL: "http://localhost:8080/",
});
instance.defaults.withCredentials = true;
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const access_token = store?.getState()?.user?.account?.access_token;
    console.log(access_token);
    // config.headers["Authorization"] = `Bearer ${access_token}`;
    // Do something before request is sent
    NProgress.start();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    // console.log('>>> interceptor',response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // const status = (error && error.response && error.response.status) || 500;
    const status = error;

    console.log(status);
    switch (status) {
      // authentication (token related issues)
      case 401: {
        // window.location.href = "/login";
        return Promise.reject(error);
      }

      // forbidden (permission related issues)
      case 403: {
        return Promise.reject(error);
      }

      // bad request
      case 400: {
        return Promise.reject(error);
      }

      // not found
      case 404: {
        return Promise.reject(error);
      }

      // conflict
      case 409: {
        return Promise.reject(error);
      }

      // unprocessable
      case 422: {
        return Promise.reject(error);
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(error);
      }
    }
  },
);
export default instance;
