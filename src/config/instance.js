import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3007",
});

// Har bir so‘rovga token qo‘shamiz
instance.interceptors.request.use(
  (config) => {
    const data = JSON.parse(localStorage.getItem("auth") || "{}");
    const token = data?.state?.token || localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Agar token muddati tugagan bo‘lsa, foydalanuvchini login sahifasiga qaytaramiz
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.data?.message === "jwt expired") {
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
