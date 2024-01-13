import { useEffect } from 'react'
import Modal from 'react-modal'
import Swal from 'sweetalert2'

import { useUiStore } from '../../../hooks/useUiStore'
import { IconDeviceFloppy, IconUser, IconX } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { customStyles } from '../../../helpers/modalStyles'
import {
  addressValidations,
  fullNameValidations,
  rtnValidations,
} from '../../../helpers/validations/clientValidations'
import { useClientStore } from '../../../hooks/useClientStore'
import { alertSuccess } from '../../../helpers/SweetAlertProps'

Modal.setAppElement('#root')

const init = {
  rtn: '',
  fullName: '',
  address: '',
}

export const ClientsModal = () => {
  const { isOpenModal, startCloseModal } = useUiStore()
  const { startSavingClient, activeClient, message } = useClientStore()

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValues: init })

  useEffect(() => {
    if (activeClient !== null) reset(activeClient)
  }, [activeClient])

  useEffect(() => {
    if (message !== undefined) {
      const successInfo = alertSuccess(message, 'info')
      Swal.fire(successInfo)
    }
  }, [message])

  const closeModalAndClean = () => {
    reset()
    clearErrors()
    startCloseModal()
  }

  const onSubmit = (data) => {
    if (startSavingClient(data)) closeModalAndClean()
  }

  return (
    <Modal
      className='modal'
      overlayClassName='modal-fondo'
      isOpen={isOpenModal}
      onRequestClose={closeModalAndClean}
      style={customStyles}
    >
      <div>
        <div className='modal-header'>
          <h5 className='modal-title'>
            <IconUser color='black' />
            &nbsp;CLIENTES
          </h5>
          <button
            type='button'
            onClick={closeModalAndClean}
            className='close'
            aria-label='Close'
          >
            <IconX color='black' />
          </button>
        </div>

        <div className='modal-body'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-2'>
              <label htmlFor='rtn' className='form-label'>
                RTN
              </label>
              <input
                type='text'
                className={`form-control ${errors.rtn ? 'is-invalid' : ''}`}
                id='rtn'
                placeholder='03012394000902'
                {...register('rtn', rtnValidations)}
                autoFocus
              />
              <small id='rtnHelp' className='form-text text-muted'>
                RTN sin guiones, Ej. 03012394000902
              </small>
              <small className='invalid-feedback text-left'>
                {errors.rtn && errors.rtn.message}
              </small>
            </div>
            <div className='mb-2'>
              <label htmlFor='fullName' className='form-label'>
                Nombre Completo
              </label>
              <input
                type='text'
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                id='fullName'
                placeholder='John Doe...'
                {...register('fullName', fullNameValidations)}
              />
              <small className='invalid-feedback text-left'>{errors.fullName?.message}</small>
            </div>
            <div className='mb-2'>
              <label htmlFor='address' className='form-label'>
                Dirección
              </label>
              <textarea
                type='text'
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                id='address'
                rows={2}
                placeholder='Barrio Torondón, Calle San Juan, #12'
                {...register('address', addressValidations)}
              />
              <small className='invalid-feedback text-left'>{errors.address?.message}</small>
            </div>
            <button type='submit' className='btn btn-dark mt-2'>
              <IconDeviceFloppy color='white' /> Guardar
            </button>
          </form>
        </div>
      </div>
    </Modal>
  )
}
