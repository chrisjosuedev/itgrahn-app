import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { AppRoutes } from "../app/routes/AppRoutes"

export const AppRouter = () => {

  const auth = 'authenticated'

  return (
    <Routes>
      {
        (auth === 'not-authenticated') ?
          <Route path='/auth/*' element={<AuthRoutes />} /> :
          <Route path='/*' element={<AppRoutes />} />
      }
      <Route path='*' element={<Navigate to={'/auth/signin'} />} />
    </Routes>
  )
}
