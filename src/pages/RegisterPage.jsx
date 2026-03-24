import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import toast from '@/utils/toast'
import RegisterForm from '@/components/Authentication/RegisterForm.jsx'

function RegisterPage() {
  const error = useAuthStore(state => state.error)

  const createErrorMessage = error => {
    toast('error', `${error}`)
  }

  useEffect(() => {
    if (error) {
      createErrorMessage(error)
    }
  }, [error])

  return <RegisterForm />
}

export default RegisterPage
