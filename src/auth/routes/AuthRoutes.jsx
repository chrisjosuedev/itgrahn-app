import { Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "../pages/SignInPage";
import { SignUpPage } from "../pages/SignUpPage";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/signin' element={<SignInPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/*' element={<Navigate to={'/auth/signin'} />} />
    </Routes>
  )
}
