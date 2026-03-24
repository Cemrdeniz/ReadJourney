import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import toast from '@/utils/toast'
import LoginForm from '@/components/Authentication/LoginForm.jsx'

function LoginPage() {
  const error = useAuthStore(state => state.error)

  const createErrorMessage = error => {
    toast('error', `${error}`)
  }

  useEffect(() => {
    if (error) {
      createErrorMessage(error)
    }
  }, [error])

  return <LoginForm />
}

export default LoginPage
