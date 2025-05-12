import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://gentle-scrubland-66496-4603e2811065.herokuapp.com/",
  withCredentials: true,
});

client.interceptors.request.use(
    (config) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      //console.log("Token in Interceptor: ", token);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  

export default client;
