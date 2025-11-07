import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://84.54.118.39:3007";

export const login = (credentials) =>
  axios.post(`${BASE_URL}/auth/login`, credentials);
