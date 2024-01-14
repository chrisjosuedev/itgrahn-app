import { IconRestore } from '@tabler/icons-react'
import {
  IconAlignCenter,
  IconListDetails,
  IconPrinter,
  IconShoppingCartOff,
} from '@tabler/icons-react'
import { useState } from 'react'

export const InvoicesView = () => {
  const [isGeneric, setIsGeneric] = useState(true)

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
                  <input
                    type='text'
                    className={`form-control`}
                    id='customer'
                    placeholder='John Doe'
                    autoFocus
                  />
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
                      checked
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
                  <input
                    type='text'
                    className='form-control'
                    id='products'
                    placeholder='Producto, Código...'
                  />
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
