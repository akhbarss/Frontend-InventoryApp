/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/api" : "http://localhost:4000/api";

export const axiosPrivateUser = axios.create({
  baseURL: BASE_URL,
  // headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});
export const axiosPrivateStudent = axios.create({
  baseURL: BASE_URL + "/student",
  withCredentials: true
});
export const axiosPrivateAdmin = axios.create({
  baseURL: BASE_URL + "/admin",
  withCredentials: true
});

const request = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default request;