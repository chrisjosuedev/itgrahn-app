import { useEffect } from 'react'
import Modal from 'react-modal'
import Swal from 'sweetalert2'

import { useUiStore } from '../../../hooks/useUiStore'
import { IconDeviceFloppy, IconBrandSuperhuman, IconX } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { customStyles } from '../../../helpers/modalStyles'

import { alertSuccess } from '../../../helpers/SweetAlertProps'
import {
  priceValidations,
  productNameValidations,
  stockValidations,
} from '../../../helpers/validations/productsValidations'
import { useProductStore } from '../../../hooks/useProductStore'

Modal.setAppElement('#root')

const init = {
  productName: '',
  stock: '',
  price: '',
}

export const ProductsModal = () => {
  const { isOpenModal, startCloseModal } = useUiStore()
  const { activeProduct, message, startSavingProduct } = useProductStore()

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValues: init })

  useEffect(() => {
    if (activeProduct !== null) reset(activeProduct)
  }, [activeProduct])

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
    const product = {
      ...data,
      productName: data.productName.trim(),
      price: parseFloat(data.price),
      stock: Number(data.stock),
    }

    if (startSavingProduct(product)) closeModalAndClean()
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
            <IconBrandSuperhuman color='black' />
            &nbsp;PRODUCTOS
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
              <label htmlFor='productName' className='form-label'>
                Nombre del Producto
              </label>
              <input
                type='text'
                className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                id='productName'
                placeholder='Coca Cola 3L, Pepsi...'
                {...register('productName', productNameValidations)}
                autoFocus
              />
              <small className='invalid-feedback text-left'>
                {errors.productName && errors.productName.message}
              </small>
            </div>
            <div className='mb-2'>
              <div className='row'>
                <div className='col-md-6'>
                  <label htmlFor='stock' className='form-label'>
                    Stock
                  </label>
                  <input
                    type='text'
                    className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                    id='stock'
                    placeholder='0'
                    {...register('stock', stockValidations)}
                  />
                  <small className='invalid-feedback text-left'>{errors.stock?.message}</small>
                </div>
                <div className='col-md-6'>
                  <label htmlFor='price' className='form-label'>
                    Precio
                  </label>
                  <input
                    type='text'
                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    id='price'
                    placeholder='0.00'
                    {...register('price', priceValidations)}
                  />
                  <small className='invalid-feedback text-left'>{errors.price?.message}</small>
                </div>
              </div>
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
