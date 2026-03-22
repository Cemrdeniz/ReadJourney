import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import toast from '@/utils/toast'
import RegisterForm from '@/components/Authentication/RegisterForm.jsx'

function RegisterPage() {
  const error = useAuthStore(state => state.error)

  const createErrorMessage = error => {
    if (`${error}` === 'auth/too-many-requests') {
      toast('error', 'Too many requests.')
    } else if (`${error}` === 'auth/network-request-failed') {
      toast('error', 'Problem with network')
    } else if (`${error}` === 'auth/email-already-in-use') {
      toast('error', 'Email already exists')
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

  return <RegisterForm />
}

export default RegisterPage
