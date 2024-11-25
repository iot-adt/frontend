import axios from "axios";

export const client = axios.create({ baseURL: "http://10.144.85.43:8080/api" });
