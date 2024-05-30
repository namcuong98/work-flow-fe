import axios from "axios";

axios.defaults.withCredentials = true;

export const defaultApi = (url, data, method = "GET") =>
  axios.create({
    baseURL: "https://work-flow-be-1.onrender.com",
    // process.env.NODE_ENV === "production"
    //     ? process.env.BASE_URL
    //     : "https://work-flow-be-1.onrender.com",
    method,
    url,
    data,
    headers: {},
  });
