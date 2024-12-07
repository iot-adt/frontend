import axios from "axios";

function creatsAxiosInstance(baseUrl: string) {
  return axios.create({
    baseURL: baseUrl,
  });
}

export const CLIENT = {
  window: creatsAxiosInstance("http://10.144.45.196:5001"),
  api: creatsAxiosInstance("http://10.144.45.196:8080/api"),
  door: creatsAxiosInstance("http://10.144.218.248:5000/api"),
};
