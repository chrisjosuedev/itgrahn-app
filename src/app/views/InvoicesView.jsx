import Select, { createFilter } from 'react-select'
import { IconRestore } from '@tabler/icons-react'
import {
  IconAlignCenter,
  IconListDetails,
  IconPrinter,
  IconShoppingCartOff,
} from '@tabler/icons-react'
import { useEffect, useMemo, useState } from 'react'
import { useProductStore } from '../../hooks/useProductStore'
import { useClientStore } from '../../hooks/useClientStore'

export const InvoicesView = () => {
  const [isGeneric, setIsGeneric] = useState(true)

  const { products, startLoadingProducts } = useProductStore()
  const { clients, startLoadingClients } = useClientStore()

  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedClient, setSelectedClient] = useState('')

  // Product Select State
  const handleProductSelect = (e) => {
    setSelectedProduct(e.value)
  }

  // Product Select State
  const handleClientSelect = (e) => {
    setSelectedClient(e.value)
  }

  // Load Products
  useEffect(() => {
    startLoadingProducts()
  }, [])

  // Load Products
  useEffect(() => {
    startLoadingClients()
  }, [])

  // Reformat Products to Select
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

  return (
    <div className='ml-2 mt-4'>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='view-title'>FACTURACIÓN</h1>
          <hr />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4 mb-2'>
          <div className='card'>
            <div className='card-header'>
              <strong>
                <IconAlignCenter color='black' /> General
              </strong>
            </div>
            <div className='card-body'>
              <form>
                <div className='mb-4'>
                  <div className='custom-control custom-checkbox'>
                    <input
                      onChange={() => setIsGeneric(!isGeneric)}
                      type='checkbox'
                      className='custom-control-input'
                      id='customCheck1'
                    />
                    <label className='custom-control-label' htmlFor='customCheck1'>
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
                  <p>{selectedClient && <span>{selectedClient}</span>}</p>
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
                      name='payment_type'
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
                      name='payment_type'
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
                    placeholder='Buscar producto...'
                  />
                  <p>{selectedProduct !== 'none' && <span>{selectedProduct}</span>}</p>
                </div>
              </form>
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
              <div className='mb-4'>
                <div className='table-responsive'>
                  <table className='text-center'>
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
                      <tr>
                        <th scope='row'>1fds4</th>
                        <td className='pl-2'>Lorem ipsum dolor sit amet consectetur</td>
                        <td>
                          <input className='form-control mx-auto amount-small' type='text' />
                        </td>
                        <td>@mdo</td>
                        <td className='text-right'>32.43</td>
                        <td>
                          <button className='btn btn-outline-danger ml-4'>
                            <IconShoppingCartOff />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className='table float-right w-50 totals-container'>
                    <tbody>
                      <tr>
                        <td className='totals text-right p-2'>SUBTOTAL</td>
                        <td className='text-right'> L. 320.00</td>
                      </tr>
                      <tr>
                        <td className='totals text-right p-2'>ISV</td>
                        <td className='text-right'> L. 32.43</td>
                      </tr>
                      <tr>
                        <td className='totals text-right p-2'>TOTAL</td>
                        <td className='text-right'> L. 352.43</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <button className='btn btn-success float-right'>
                <IconPrinter /> Imprimir
              </button>
              <button className='btn btn-info mr-2 float-right'>
                <IconRestore /> Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
