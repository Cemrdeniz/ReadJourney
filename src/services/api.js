import axios from "axios";

const API_URL = "https://readjourney.b.goit.study/api";

// 🔥 Axios instance
export const api = axios.create({
  baseURL: API_URL,
});

//
// 🔐 TOKEN (SAĞLAM VERSİYON)
//

const getToken = () => localStorage.getItem("token");

// request interceptor → HER REQUEST'TE TOKEN EKLE
api.interceptors.request.use(config => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//
// 🔁 TOKEN YÖNETİMİ
//

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

//
// 🔑 AUTH
//

export const signupUserApi = async (data) => {
  const res = await api.post("/users/signup", data);

  if (res.data.token) {
    setToken(res.data.token);
  }

  return res.data;
};

export const signinUserApi = async (data) => {
  const res = await api.post("/users/signin", data);

  if (res.data.token) {
    setToken(res.data.token);
  }

  return res.data;
};

export const currentUserApi = async () => {
  const res = await api.get("/users/current");
  return res.data;
};

export const refreshUserApi = async () => {
  const res = await api.get("/users/current/refresh");

  if (res.data.token) {
    setToken(res.data.token);
  }

  return res.data;
};

//
// 🔴 SIGNOUT (401 FIX)
//

export const signoutUserApi = async () => {
  const token = getToken();

  if (!token) return;

  try {
    await api.post("/users/signout");
  } catch (error) {
    console.log("Signout API error:", error);
  } finally {
    clearToken();
  }
};

//
// 📚 BOOKS
//

export const getRecommendedApi = async () => {
  const res = await api.get("/books/recommend");

  console.log("API RESPONSE:", res.data);

  return res.data?.results || [];
};

export const getOwnBooksApi = async () => {
  const res = await api.get("/books/own");
  return res.data;
};

//
// ✅ ADD BOOK (400 FIX)
//

export const addBookApi = async (book) => {
  const { data } = await api.post("/books/add", {
    title: book.title,
    author: book.author,
    totalPages: Number(book.totalPages),
    color: book.color,
  });

  return data;
};

//
// 📌 RECOMMENDED → LIBRARY
//

export const addBookFromRecommendedApi = async (id) => {
  const { data } = await api.post(`/books/add/${id}`);
  return data;
};


export const removeBookApi = async (id) => {
  const res = await api.delete(`/books/remove/${id}`);
  return res.data;
};

//
// 📖 READING
//
export const getReadingBookApi = async (id) => {
  const res = await api.get(`/books/${id}`)
  return res.data
}
export const startReadingApi = async ({ id, page }) => {
  const { data } = await api.post('/books/reading/start', {
    id,
    page
  })
  return data
}

export const finishReadingApi = async ({ id, page }) => {
  const { data } = await api.post('/books/reading/finish', {
    id,
    page
  })
  return data
}
export const deleteReadingApi = async ({ id, progressId }) => {
  const { data } = await api.delete("/books/reading", {
    data: { id: String(id), progressId }
  });

  return data;
};
