import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

import { passwordValidations, usernameValidations } from "../../helpers/validations/authValidations"
import { useAuthStore } from "../../hooks/useAuthStore"
import { useEffect } from "react"
import { alertSuccess } from "../../helpers/SweetAlertProps"

const initForm = {
  username: '',
  password: '',
}

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initForm })

  const { message, startSignIn } = useAuthStore()

  useEffect(() => {
    if (message !== undefined) {
      const successInfo = alertSuccess(message, 'info')
      Swal.fire(successInfo)
    }
  }, [message])

  const onSubmit = (data) => {
    if (startSignIn(data)) {
      const successInfo = alertSuccess('Inicio de sesión exitoso.', 'success')
      Swal.fire(successInfo)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-row mb-2'>
          <input
            type='text'
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            placeholder='Usuario'
            {...register('username' , usernameValidations)}
          />
          <small className='invalid-feedback text-left'>
            {errors.username && errors.username.message}
          </small>
        </div>
        <div className='form-row'>
          <input
            type='password'
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password' , passwordValidations)}
            placeholder='Password'
          />
          <small className='invalid-feedback text-left'>
            {errors.password && errors.password.message}
          </small>
        </div>
        <div className='form-row'>
          <button type='submit' className='btn btn-dark btn-login btn-block mt-2'>
            Login
          </button>
        </div>
      </form>
      <br />
      <div className='mx-auto text-center'>
        <small className='form-text text-muted text-center'>¿No tienes una cuenta?</small>
        <Link className='signup-link' to={'/auth/signup'}>
          Registrarse
        </Link>
      </div>
    </>
  )
}
