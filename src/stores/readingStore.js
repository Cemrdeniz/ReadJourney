import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  startReadingApi,
  finishReadingApi,
  deleteReadingApi,
  getReadingBookApi
} from '@/services/api'
import { useLibraryStore } from '@/stores/libraryStore.js'

export const useReadingStore = create()(
  persist(
    (set, get) => ({
      book: null,
      isReading: false,
      isReaded: false,
      isLoading: false,
      error: null,

      setBook: (book) => {
        set({
          book,
          isReading: book?.status === 'reading',
          isReaded: book?.status === 'done'
        })
      },

      fetchBook: async (bookId) => {
        if (!bookId) return

        set({ isLoading: true })

        try {
          const data = await getReadingBookApi(bookId)

          set({
            book: data,
            isReaded: data?.status === 'done'
          })

        } catch (error) {
          set({ error: error?.message })
        } finally {
          set({ isLoading: false })
        }
      },

      setReadingStart: async ({ page }) => {
  const book = get().book
  if (!book?._id) return

  set({ isLoading: true })

  try {
    await startReadingApi({
      id: String(book._id),
      page: Number(page)
    })

    const updated = await getReadingBookApi(book._id)

    // 🔥 BURASI KRİTİK
    set({
      book: updated,
      isReading: true,   // HER ZAMAN TRUE YAP
      isReaded: false
    })

  } catch (error) {
    if (error?.response?.status === 409) {
      // zaten başlamış → state düzelt
      const updated = await getReadingBookApi(book._id)

      set({
        book: updated,
        isReading: true   // 🔥 BURAYI EKLE
      })

      return
    }

    set({ error: error?.message })
  } finally {
    set({ isLoading: false })
  }
},
      setReadingStop: async ({ page }) => {
      const book = get().book
  if (!book?._id) return

  set({ isLoading: true })

  try {
    const isFinished = Number(page) >= Number(book.totalPages)

    await finishReadingApi({
      id: String(book._id),
      page: Number(page)
    })

    const updated = await getReadingBookApi(book._id)

    set({
      book: updated,
      isReading: false,
      isReaded: isFinished || updated?.status === 'done'
    })

    if (isFinished || updated?.status === 'done') {
      await useLibraryStore.getState().getBooks()
    }

  } catch (error) {
    set({ error: error?.message })
  } finally {
    set({ isLoading: false })
  }
},

    
      removeProgressItem: async (idBook, progressId) => {
        if (!idBook) return

        set({ isLoading: true })

        try {
          await deleteReadingApi({
            id: idBook,
            progressId
          })

          const updated = await getReadingBookApi(idBook)

          set({ book: updated })

        } catch (error) {
          set({ error: error?.message })
        } finally {
          set({ isLoading: false })
        }
      },

      readingFinish: () => set({ isReaded: true }),
      setIsReaded: (value) => set({ isReaded: value }),

      resetDefault: () =>
        set({
          book: null,
          isReading: false,
          isReaded: false,
          isLoading: false,
          error: null
        })
    }),
    {
      name: 'book-reading',
      partialize: (state) => ({
        book: state.book,
        isReaded: state.isReaded
      })
    }
  )
)
