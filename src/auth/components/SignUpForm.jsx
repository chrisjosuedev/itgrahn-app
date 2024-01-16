import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Swal from 'sweetalert2'

import { Link } from 'react-router-dom'
import { fullNameValidations } from '../../helpers/validations/clientValidations'
import {
  passwordValidations,
  usernameValidations,
} from '../../helpers/validations/authValidations'
import { useAuthStore } from '../../hooks/useAuthStore'
import { alertSuccess } from '../../helpers/SweetAlertProps'

const initForm = {
  fullName: '',
  username: '',
  password: '',
}

export const SignUpForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: initForm })

  const { message, startSignUp } = useAuthStore()

  useEffect(() => {
    if (message !== undefined) {
      const successInfo = alertSuccess(message, 'info')
      Swal.fire(successInfo)
    }
  }, [message])

  const onSubmit = (data) => {
    if (startSignUp(data)) {
      const successInfo = alertSuccess('Usuario registrado exitosamente.', 'success')
      Swal.fire(successInfo)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-row mb-2'>
          <input
            type='text'
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            {...register('fullName', fullNameValidations)}
            placeholder='Nombre Completo'
          />
          <small className='invalid-feedback text-left'>
            {errors.fullName && errors.fullName.message}
          </small>
        </div>
        <div className='form-row mb-2'>
          <input
            type='text'
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            {...register('username', usernameValidations)}
            placeholder='Usuario'
          />
          <small className='invalid-feedback text-left'>
            {errors.username && errors.username.message}
          </small>
        </div>
        <div className='form-row mb-2'>
          <input
            type='password'
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password', passwordValidations)}
            placeholder='Password'
          />
          <small className='invalid-feedback text-left'>
            {errors.password && errors.password.message}
          </small>
        </div>
        <div className='form-row'>
          <button className='btn btn-dark btn-login btn-block'>Registrarme</button>
        </div>
      </form>
      <br />
      <div className='mx-auto text-center'>
        <small className='form-text text-muted text-center'>¿Ya tienes una cuenta?</small>
        <Link className='signup-link' to={'/auth/signin'}>
          Inciar Sesión
        </Link>
      </div>
    </>
  )
}
