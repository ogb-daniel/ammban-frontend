import axios from "axios";
import { cookies } from "next/headers";

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  async (config) => {
    // For client-side requests
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // For server-side requests
    else {
      try {
        const cookieStore = await cookies();

        const token = cookieStore.get("accessToken")?.value;
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error("Error getting auth token:", error);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle auth errors (e.g., token expired)
    if (error.response?.status === 401) {
      // For client-side errors
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        window.location.href = "/";
      }
      // For server-side errors, we'll handle this in the route handlers
    }

    return Promise.reject(error);
  }
);

export default api;
