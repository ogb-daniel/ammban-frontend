import axios from "axios";
import { cookies } from "next/headers";
import { createSession, deleteSession } from "../session";

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
    // Disable caching for all requests
    config.headers["Cache-Control"] = "no-cache";
    config.headers["Pragma"] = "no-cache";

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
  (error) => Promise.reject(error),
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Handle auth errors (e.g., token expired)
    if (error.response?.status === 401) {
      // For client-side errors
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        window.location.href = "/";
      }
      // For server-side errors, we'll handle this in the route handlers
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        if (typeof window === "undefined") {
          try {
            const cookieStore = await cookies();
            const refreshToken = cookieStore.get("refreshToken")?.value;
            const user = JSON.parse(cookieStore.get("user")!.value);
            const role = cookieStore.get("role")!.value;
            if (refreshToken) {
              const refreshResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/TokenAuth/Refresh`,
                { refreshToken },
              );
              if (refreshResponse.data?.result?.accessToken) {
                const {
                  accessToken,
                  refreshToken: newRefreshToken,
                  expireInSeconds,
                  refreshTokenExpireInSeconds,
                } = refreshResponse.data.result;
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                await createSession(
                  accessToken,
                  expireInSeconds,
                  role,
                  user,
                  newRefreshToken,
                  refreshTokenExpireInSeconds,
                );
                return api(originalRequest);
              }
            }
          } catch (error) {
            console.error(`Cannot refresh token: ${error}`);
            await deleteSession();
          }
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
