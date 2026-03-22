import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import toast from '@/utils/toast'
import LoginForm from '@/components/Authentication/LoginForm.jsx'

function LoginPage() {
  const error = useAuthStore(state => state.error)

  const createErrorMessage = error => {
    if (`${error}` === 'auth/too-many-requests') {
      toast('error', 'Too many requests.')
    } else if (`${error}` === 'auth/network-request-failed') {
      toast('error', 'Problem with network')
    } else if (`${error}` === 'auth/invalid-login-credentials') {
      toast('error', 'Email or password is not correct')
    } else if (`${error}` === 'auth/invalid-credential') {
      toast('error', 'User not found')
    } else {
      console.log(error)
    }
    return error
  }

  useEffect(() => {
    if (error) {
      createErrorMessage(error)
    }
  }, [error])

  return <LoginForm />
}

export default LoginPage
