import { lazy, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Toaster } from '@/components/ui/toaster'
import AuthLayout from '@/layouts/AuthLayout.jsx'
import WelcomePage from '@/pages/WelcomePage.jsx'
import { useAuthStore } from '@/stores/authStore'

const MainLayout = lazy(() => import('./layouts/MainLayout'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RecommendedPage = lazy(() => import('./pages/RecommendedPage'))
const MyLibraryPage = lazy(() => import('./pages/MyLibraryPage'))
const ReadingPage = lazy(() => import('./pages/ReadingPage'))

function App() {
  const isAuth = useAuthStore(state => state.isAuth)
  const [hasHydrated, setHasHydrated] = useState(
    useAuthStore.persist?.hasHydrated?.() ?? true
  )

  useEffect(() => {
    if (useAuthStore.persist?.hasHydrated?.()) {
      setHasHydrated(true)
      return
    }

    const unsubscribe = useAuthStore.persist?.onFinishHydration?.(() => {
      setHasHydrated(true)
    })

    return () => unsubscribe?.()
  }, [])

  if (!hasHydrated) {
    return <Toaster />
  }

  return (
    <>
      <Routes>
        {!isAuth ? (
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<WelcomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        ) : (
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="recommended" replace />} />
            <Route path="recommended" element={<RecommendedPage />} />
            <Route path="library" element={<MyLibraryPage />} />
            <Route path="reading/:id" element={<ReadingPage />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
