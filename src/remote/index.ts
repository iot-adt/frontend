import axios from "axios";

const window = axios.create({
  baseURL: "http://10.144.115.93:5000",
});
const api = axios.create({
  baseURL: "http://10.144.85.43:8080/api",
});

export const CLIENT = {
  window,
  api,
};
