import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { AppRoutes } from '../app/routes/AppRoutes'
import { useAuthStore } from '../hooks/useAuthStore'
import { SpinnerLoader } from '../app/components/SpinnerLoader'

export const AppRouter = () => {
  const { currentStatus, startCheckingToken } = useAuthStore()

  useEffect(() => {
    startCheckingToken()
  }, [])

  if (currentStatus === 'checking') return <SpinnerLoader />

  return (
    <Routes>
      {currentStatus === 'not-authenticated' ? (
        <Route path='/auth/*' element={<AuthRoutes />} />
      ) : (
        <Route path='/*' element={<AppRoutes />} />
      )}
      <Route path='*' element={<Navigate to={'/auth/signin'} />} />
    </Routes>
  )
}
