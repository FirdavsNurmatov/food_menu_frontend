import axios from "axios";

const API_URL = "http://84.54.118.39:3007/auth";

export const login = (credentials) =>
  axios.post(`${API_URL}/login`, credentials);
