import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import {
  signupUserApi,
  signinUserApi,
  currentUserApi,
  signoutUserApi,
  clearToken
} from '@/services/api'
import toast from '@/utils/toast'

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  'Something went wrong'

const initialState = {
  name: null,
  email: null,
  token: null,
  isAuth: false,
  isLoading: false,
  error: null
}

export const useAuthStore = create()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        // 🔐 SIGNUP
        signupUser: async ({ name, email, password }) => {
          set({ isLoading: true, error: null })

          try {
            const data = await signupUserApi({
              name,
              email,
              password
            })

            // API: { user, token }
            set({
              name: data.user?.name,
              email: data.user?.email,
              token: data.token,
              isAuth: true
            })

            toast('success', 'Signup successful!')
          } catch (error) {
            const message = getErrorMessage(error)
            set({ error: message })
            toast('error', message)
          } finally {
            set({ isLoading: false })
          }
        },

        // 🔑 SIGNIN
        signinUser: async ({ email, password }) => {
          set({ isLoading: true, error: null })

          try {
            const data = await signinUserApi({
              email,
              password
            })

            // API: { user, token }
            set({
              name: data.user?.name,
              email: data.user?.email,
              token: data.token,
              isAuth: true
            })

            toast('success', 'Login successful!')
          } catch (error) {
            const message = getErrorMessage(error)
            set({ error: message })
            toast('error', message)
          } finally {
            set({ isLoading: false })
          }
        },

        // 👤 CURRENT USER
        currentUser: async () => {
          try {
            const data = await currentUserApi()

            if (data) {
              set({
                name: data.name,
                email: data.email,
                isAuth: true
              })
            }
          } catch (error) {
            if (error?.response?.status === 401) {
              clearToken()
              set(initialState)
              return
            }

            set({ error: getErrorMessage(error) })
          }
        },

        resetAuth: () => {
          clearToken()
          set(initialState)
        },

        // 🚪 SIGNOUT
        signoutUser: async () => {
          try {
            await signoutUserApi()

            set(initialState)

            toast('success', 'Sign-out successful')
          } catch (error) {
            const message = getErrorMessage(error)
            set({ error: message })
            toast('error', message)
          }
        }
      }),
      {
        name: 'auth-storage',
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) =>
                !['isLoading', 'error'].includes(key)
            )
          )
      }
    )
  )
)
