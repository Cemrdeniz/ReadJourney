import axios from "axios";

const API = "https://readjourney.b.goit.study/api";

const api = axios.create({
  baseURL: API,
});

// TOKEN
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// BOOKS
export const getRecommendedBooks = (params) =>
  api.get("/books/recommend", { params }).then((res) => res.data);

export const addBookFromRecommend = (id) =>
  api.post(`/books/add/${id}`).then((res) => res.data);

export const getMyBooks = () =>
  api.get("/books/own").then((res) => res.data);

export const removeBook = (id) =>
  api.delete(`/books/remove/${id}`).then((res) => res.data);