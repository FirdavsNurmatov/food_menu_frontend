import axios from "axios";

const API_URL = "http://localhost:3007/auth";

export const login = (credentials) =>
  axios.post(`${API_URL}/login`, credentials);
