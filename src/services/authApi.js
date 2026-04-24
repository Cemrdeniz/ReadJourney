import axios from "axios";

const API = "https://readjourney.b.goit.study/api";

const api = axios.create({
  baseURL: API,
});

// =====================
// 🔐 TOKEN
// =====================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// =====================
// 👤 AUTH
// =====================

export const registerUser = async (data) => {
  const res = await api.post("/users/signup", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/users/signin", data);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/users/current");
  return res.data;
};

export const refreshUser = async () => {
  const res = await api.get("/users/current/refresh");
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/users/signout");
  return res.data;
};


