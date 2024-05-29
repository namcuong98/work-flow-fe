import axios from "axios";

axios.defaults.withCredentials = true;

export const defaultApi = (url, data, method = "GET") =>
  axios.create({
    baseURL: "https://work-flow-be-1.onrender.com:8081/",
    // process.env.NODE_ENV === "production"
    //     ? process.env.BASE_URL
    //     : "http://localhost:8081/",
    method,
    url,
    data,
    headers: {},
  });
