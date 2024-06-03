import axios from "axios";

axios.defaults.withCredentials = true;

export const defaultApi = (url, data, method = "GET") =>
  axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    method,
    url,
    data,
    headers: {},
  });
