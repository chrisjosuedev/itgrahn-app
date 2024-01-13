import { Navigate, Route, Routes } from "react-router-dom";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/signin' element={<h1>SiginIn</h1>} />
      <Route path='/signup' element={<h1>SiginUp</h1>} />
      <Route path='/*' element={<Navigate to={'/auth/signin'} />} />
    </Routes>
  )
}
