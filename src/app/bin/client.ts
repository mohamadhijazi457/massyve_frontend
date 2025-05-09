import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/auth",
  withCredentials: true,
});

client.interceptors.request.use(
    (config) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      console.log("Token in Interceptor: ", token);  // Add this line to debug
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  

export default client;
