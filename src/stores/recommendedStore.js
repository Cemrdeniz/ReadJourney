import { create } from 'zustand'
import { getRecommendedApi } from '@/services/api'

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
      set({ error: error?.response?.data })
    } finally {
      set({ isLoading: false })
    }
  }
}))