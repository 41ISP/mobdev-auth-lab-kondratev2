import axios from "axios";
import { useUserStore } from "../store/useUserStore";

const apiClient = axios.create({
  baseURL: "https://api.kitek-pg.ru/api/marketplace/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const { session } = useUserStore.getState();

  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }

  return config;
});

export const api = {
  // Регистрация
  register: async (username, email, password) => {
    const response = await apiClient.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  },

  login: async (username, password) => {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  },

  getMe: async () => {
    try {
      const response = await apiClient.get("/auth/me");
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error)
      return null; 
    }
  },
};