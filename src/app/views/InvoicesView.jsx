import { useFieldArray, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import Select, { createFilter } from 'react-select'
import { IconRestore } from '@tabler/icons-react'
import {
  IconAlignCenter,
  IconListDetails,
  IconPrinter,
  IconShoppingCartOff,
} from '@tabler/icons-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useClientStore } from '../../hooks/useClientStore'
import { Message } from '../components/Message'
import { useInvoiceStore } from '../../hooks/useInvoiceStore'
import { useProductStore } from '../../hooks/useProductStore'
import { quantityValidations } from '../../helpers/validations/invoiceValidations'
import { alertSuccess } from '../../helpers/SweetAlertProps'
import { getEnvVariables } from '../../helpers/getEnvVariables'

export const InvoicesView = () => {
  const { VITE_ISV: ISV } = getEnvVariables()

  const {
    control,
    register,
    setError,
    reset,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      itemQuantity: [],
    },
  })
  const { append, remove } = useFieldArray({
    control,
    name: 'itemQuantity',
  })

  const { products, startLoadingProducts } = useProductStore()
  const { clients, startLoadingClients } = useClientStore()
  const {
    cart,
    startAddingToCart,
    startUpdatingItemInCart,
    startDeletingItemInCart,
    startAddingInvoice,
    startRemoveCart,
  } = useInvoiceStore()

  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [isGeneric, setIsGeneric] = useState(true)
  const [msgAlert, setMsgAlert] = useState(false)
  const [paymentSelected, setPaymentSelected] = useState('cash')

  const genericRef = useRef(null)

  // Load items
  useEffect(() => {
    startLoadingProducts()
  }, [selectedProduct])

  // Load Products
  useEffect(() => {
    startLoadingClients()
  }, [isGeneric])

  // Product Select State
  const handleClientSelect = (e) => {
    setSelectedClient(e.value)
  }

  // Product Select State
  const handleProductSelect = ({ value: id }) => {
    setSelectedProduct(id)
    const itemSelected = products.find((p) => p.id === id)
    if (itemSelected.stock === 0) {
      const successInfo = alertSuccess('No hay existencias en inventario', 'info')
      Swal.fire(successInfo)
      return
    }
    startAddingToCart({
      productId: itemSelected.id,
      product: itemSelected.productName,
      quantity: 1,
      price: itemSelected.price,
    })
    append({ quantity: 1 })
  }

  // Remove Item
  const onRemoveItem = (id, index) => {
    startDeletingItemInCart(id)
    remove(index)
  }

  // Handle Quantity Change
  const handleQuantityChange = (value, index, id) => {
    value = Number(value)
    if (value < 0) return
    const itemInCart = products.find((p) => p.id === id)
    if (itemInCart.stock < value) {
      setError(`root.itemQuantity.${index}.quantity`, {
        type: 'custom',
      })
      const successInfo = alertSuccess(
        `No hay stock suficiente: ${itemInCart.stock} en inventario`,
        'info'
      )
      Swal.fire(successInfo)
      return
    }
    // Update Item In Cart
    startUpdatingItemInCart(id, value)
    clearErrors()
  }

  // Handle Payment Change
  const handlePaymentChange = (e) => {
    setPaymentSelected(e.target.value)
  }

  // Handle Checkbox
  const handleCheckGeneric = () => {
    setIsGeneric(!isGeneric)
    if (!isGeneric) setSelectedClient('')
  }

  // Clean State
  const onCleanInvoice = () => {
    // Change to Generic
    if (!isGeneric) genericRef.current.checked = false

    setSelectedClient('')
    setSelectedProduct('')
    setIsGeneric(true)
    setMsgAlert(false)
    setPaymentSelected('cash')
    startRemoveCart()
    reset()
  }

  // Handle Invoice Process
  const onHandleInvoice = (data) => {
    const { paymentType } = data

    // Check if Generic Invoice
    if (!isGeneric && !selectedClient) {
      setMsgAlert(true)
      return
    }
    setMsgAlert(false)

    const invoice = {
      payment: paymentType === 'cash' ? true : false,
      date: new Date().getTime(),
      clientId: selectedClient,
      detail: cart,
    }

    if (startAddingInvoice(invoice)) {
      // Clean State
      onCleanInvoice()
      const successInfo = alertSuccess('Factura generada exitosamente', 'success')
      Swal.fire(successInfo)
    }
  }

  // Reformat products to Select
  const allProducts = useMemo(() => {
    return products.map((prod) => {
      return {
        value: prod.id,
        label: prod.productName,
      }
    })
  }, [products, selectedProduct])

  // Reformat Clients to Select
  const allClients = useMemo(() => {
    return clients.map((client) => {
      return {
        value: client.rtn,
        label: client.fullName,
      }
    })
  }, [clients, selectedClient])

  // Filtering Data in Select
  const filterFactory = (option, inputValue, data) => {
    const { label, value } = option
    const otherKey = data.filter(
      (opt) =>
        (opt.label === label && opt.value.includes(inputValue)) ||
        opt.label.includes(inputValue)
    )
    return value.includes(inputValue) || otherKey.length > 0
  }

  // Calculate Global Subtotals
  const totals = useMemo(() => {
    return cart.reduce((prev, curr) => prev + curr.subtotal, 0)
  }, [cart])

  const isv = useMemo(() => {
    return totals * parseFloat(ISV)
  }, [totals])

  return (
    <div className='ml-2 mt-4'>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='view-title'>FACTURACIÓN</h1>
          <hr />
        </div>
      </div>
      <form onSubmit={handleSubmit(onHandleInvoice)} noValidate>
        <div className='row'>
          <div className='col-md-4 mb-2'>
            <div className='card'>
              <div className='card-header'>
                <strong>
                  <IconAlignCenter color='black' /> General
                </strong>
              </div>
              <div className='card-body'>
                <div className='mb-4'>
                  <div className='custom-control custom-checkbox'>
                    <input
                      onChange={handleCheckGeneric}
                      ref={genericRef}
                      type='checkbox'
                      className='custom-control-input'
                      id='generic'
                    />
                    <label className='custom-control-label' htmlFor='generic'>
                      Factura Completa
                    </label>
                  </div>
                </div>
                <div className={`mb-4 ${isGeneric ? 'd-none' : ''}`}>
                  <label htmlFor='customer' className='form-label'>
                    <b>Cliente: </b>
                  </label>
                  <Select
                    className='select'
                    options={allClients}
                    onChange={handleClientSelect}
                    value={allClients.filter((option) => {
                      return option.value === selectedClient
                    })}
                    filterOption={createFilter((...props) => filterFactory(props, allClients))}
                    label='Seleccionar...'
                    placeholder='Buscar cliente...'
                  />
                  <div className={`text-danger ${msgAlert ? '' : 'd-none'}`}>
                    <small>Cliente es requerido</small>
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='payment' className='form-label'>
                    <b>Pago: </b>
                  </label>
                  <br />
                  <div className='custom-control custom-radio custom-control-inline'>
                    <input
                      type='radio'
                      id='cash'
                      {...register('paymentType')}
                      value='cash'
                      checked={paymentSelected === 'cash'}
                      onChange={handlePaymentChange}
                      className='custom-control-input'
                    />
                    <label className='custom-control-label' htmlFor='cash'>
                      Efectivo
                    </label>
                  </div>
                  <div className='custom-control custom-radio custom-control-inline'>
                    <input
                      type='radio'
                      id='credit'
                      {...register('paymentType')}
                      value='credit'
                      checked={paymentSelected === 'credit'}
                      onChange={handlePaymentChange}
                      className='custom-control-input'
                    />
                    <label className='custom-control-label' htmlFor='credit'>
                      Crédito
                    </label>
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='products' className='form-label'>
                    <b>Agregar Productos: </b>
                  </label>
                  <Select
                    options={allProducts}
                    onChange={handleProductSelect}
                    value={allProducts.filter((option) => {
                      return option.value === selectedProduct
                    })}
                    filterOption={createFilter((...props) =>
                      filterFactory(props, allProducts)
                    )}
                    label='Seleccionar...'
                    placeholder='Buscar por Descripción, Código...'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-8 mb-4'>
            <div className='card'>
              <div className='card-header'>
                <strong>
                  <IconListDetails color='black' /> Detalle
                </strong>
              </div>
              <div className='card-body'>
                {cart.length > 0 ? (
                  <div className='container'>
                    <div className='mb-4'>
                      <div className='table-responsive'>
                        <table className='text-center w-100'>
                          <thead>
                            <tr>
                              <th scope='col'>Cod.</th>
                              <th scope='col'>Producto</th>
                              <th scope='col'>Cantidad</th>
                              <th scope='col'>Precio Unit.</th>
                              <th scope='col'>Subtotal</th>
                              <th scope='col'></th>
                            </tr>
                          </thead>
                          <tbody>
                            {cart.map((item, index) => (
                              <tr key={item.productId}>
                                <th scope='row'>{item.productId}</th>
                                <td className='pl-2'>{item.product}</td>
                                <td>
                                  <input
                                    type='number'
                                    className={`form-control mx-auto amount-small ${
                                      errors.itemQuantity?.[index]?.quantity
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                                    {...register(`itemQuantity.${index}.quantity`, {
                                      ...quantityValidations,
                                      onChange: (e) =>
                                        handleQuantityChange(
                                          e.target.value,
                                          index,
                                          item.productId
                                        ),
                                    })}
                                  />
                                </td>
                                <td>{item.price}</td>
                                <td className='text-right'>{item.subtotal.toFixed(2)}</td>
                                <td>
                                  <button
                                    className='btn btn-outline-danger ml-4'
                                    onClick={() => onRemoveItem(item.productId, index)}
                                  >
                                    <IconShoppingCartOff />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <table className='table float-right w-50 totals-container'>
                          <tbody>
                            <tr>
                              <td className='totals text-right p-2'>SUBTOTAL</td>
                              <td className='text-right'> L. {totals.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td className='totals text-right p-2'>ISV</td>
                              <td className='text-right'> L. {isv.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td className='totals text-right p-2'>TOTAL</td>
                              <td className='text-right'> L. {(totals + isv).toFixed(2)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <button
                      type='submit'
                      className='btn btn-success float-right'
                      disabled={Object.keys(errors).length > 0}
                    >
                      <IconPrinter /> Imprimir
                    </button>
                    <button className='btn btn-info mr-2 float-right' onClick={onCleanInvoice}>
                      <IconRestore /> Limpiar
                    </button>
                  </div>
                ) : (
                  <Message message='🛒 No hay productos en el carrito...' type={'light'} />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
