import axios from "axios";

axios.defaults.withCredentials = true;

export const defaultApi = (url, data, method = "GET") =>
  axios.create({
    baseURL: "http://localhost:8081/",
    method,
    url,
    data,
    headers: {},
  });