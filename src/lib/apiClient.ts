import axios from "axios";
import { useAuth } from "../context/userAuth";

const apiClient = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  headers: {
    "Content-type": "application/json",
  }
});

// apiClient.interceptors.request.use((config) => {
//   const { token } = useAuth(); // ここでトークンを取得
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


export default apiClient;