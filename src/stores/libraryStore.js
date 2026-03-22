import { create } from 'zustand'
import {
  getOwnBooksApi,
  addBookApi,
  addBookFromRecommendedApi,
  removeBookApi
} from '@/services/api'

const getToken = () => localStorage.getItem('token')

export const useLibraryStore = create((set) => ({
  books: [],
  isLoading: false,
  error: null,
  isAdded: false,

  // 📥 GET BOOKS
  getBooks: async () => {
    try {
      const token = getToken()
      if (!token) return

      const data = await getOwnBooksApi()

      set({
        books: Array.isArray(data)
          ? data
          : data?.results || []
      })

    } catch (error) {
      set({ error: error?.response?.data })
    }
  },

  // ➕ FORM'DAN KİTAP EKLE (🔥 ANA FIX)
  addBook: async (book) => {
    try {
      set({ isLoading: true, error: null, isAdded: false })

      const token = getToken()
      if (!token) return

      await addBookApi(book)

      const updatedBooks = await getOwnBooksApi()

      set({
        books: Array.isArray(updatedBooks)
          ? updatedBooks
          : updatedBooks?.results || [],
        isAdded: true
      })

    } catch (error) {
      console.error('ADD BOOK ERROR:', error)
      set({ error: error?.response?.data })
    } finally {
      set({ isLoading: false })
    }
  },

  // ⭐ RECOMMENDED'DAN EKLE
  addRecommendedBook: async (id) => {
    try {
      set({ isLoading: true, error: null })

      const token = getToken()
      if (!token) return

      await addBookFromRecommendedApi(id)

      const updatedBooks = await getOwnBooksApi()

      set({
        books: Array.isArray(updatedBooks)
          ? updatedBooks
          : updatedBooks?.results || []
      })

    } catch (error) {
      set({ error: error?.response?.data })
    } finally {
      set({ isLoading: false })
    }
  },

  // ❌ REMOVE
  removeBook: async (id) => {
    try {
      set({ isLoading: true })

      const token = getToken()
      if (!token) return

      await removeBookApi(id)

      const updatedBooks = await getOwnBooksApi()

      set({
        books: Array.isArray(updatedBooks)
          ? updatedBooks
          : updatedBooks?.results || []
      })

    } catch (error) {
      set({ error: error?.response?.data })
    } finally {
      set({ isLoading: false })
    }
  },

  // 🔄 dialog reset
  resetAdded: () => set({ isAdded: false }),

  // allow components to set isAdded directly (used by DialogBookStat)
  setIsAdded: (value) => set({ isAdded: value })
}))