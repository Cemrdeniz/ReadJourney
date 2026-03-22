import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import {
  signupUserApi,
  signinUserApi,
  currentUserApi,
  signoutUserApi
} from '@/services/api'
import toast from '@/utils/toast'

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
            set({ error: error.message })
            toast('error', error.message)
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
            set({ error: error.message })
            toast('error', error.message)
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
            set({ error: error.message })
          }
        },

        // 🚪 SIGNOUT
        signoutUser: async () => {
          try {
            await signoutUserApi()

            set(initialState)

            toast('success', 'Sign-out successful')
          } catch (error) {
            set({ error: error.message })
            toast('error', 'Logout failed')
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