import { create } from 'zustand'
import { getRecommendedApi } from '@/services/api'
import { useAuthStore } from '@/stores/authStore'

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  'Failed to load recommended books'

export const useRecommendedStore = create((set) => ({
  books: [],
  isLoading: false,
  error: null,

  // 🔥 EKLE (YOKTU!)
  title: '',
  author: '',

  // 🔥 EKLE (YOKTU!)
  setTitle: (title) => set({ title }),
  setAuthor: (author) => set({ author }),

  getBooks: async () => {
    try {
      set({ isLoading: true, error: null })

      const data = await getRecommendedApi()

      set({
        books: Array.isArray(data)
          ? data
          : data?.results || []
      })

    } catch (error) {
      console.error('GET RECOMMENDED ERROR:', error)

      if (error?.response?.status === 401) {
        useAuthStore.getState().resetAuth()
      }

      set({
        error: getErrorMessage(error),
        books: []
      })
    } finally {
      set({ isLoading: false })
    }
  }
}))
