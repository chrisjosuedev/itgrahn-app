import { SignInForm } from "../components/SignInForm"
import { AuthLayout } from '../layout/AuthLayout'

export const SignInPage = () => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  )
}
