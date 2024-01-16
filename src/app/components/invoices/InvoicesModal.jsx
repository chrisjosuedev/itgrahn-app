import Modal from 'react-modal'
import { useUiStore } from '../../../hooks/useUiStore'
import { useInvoiceStore } from '../../../hooks/useInvoiceStore'
import { useMemo } from 'react'
import { customStyles } from '../../../helpers/modalStyles'
import { IconShoppingBag, IconX } from '@tabler/icons-react'
import { getEnvVariables } from '../../../helpers/getEnvVariables'

Modal.setAppElement('#root')

export const InvoicesModal = () => {
  const { VITE_ISV: ISV } = getEnvVariables()

  const { isOpenModal, startCloseModal } = useUiStore()
  const { invoiceDetail, activeInvoice } = useInvoiceStore()

  const closeModalAndClean = () => {
    startCloseModal()
  }

  // Calculate Global Subtotals
  const totals = useMemo(() => {
    return invoiceDetail.reduce((prev, curr) => prev + curr.subtotal, 0)
  }, [invoiceDetail])

  const isv = useMemo(() => {
    return totals * parseFloat(ISV)
  }, [totals])

  return (
    <Modal
      className='modal invoice-modal'
      overlayClassName='modal-fondo'
      isOpen={isOpenModal}
      onRequestClose={closeModalAndClean}
      style={customStyles}
    >
      <div className='container'>
        <div className='modal-header'>
          <h5 className='modal-title'>
            <IconShoppingBag color='black' />
            &nbsp;FACTURA
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
        <div className='table-responsive'>
          <div className='modal-body'>
            <div className='row mb-4'>
              <div className='col-md-6'>
                <b>Código:</b> <br /> {activeInvoice?.id}
              </div>
              <div className='col-md-6'>
                <b>Fecha: </b> {activeInvoice?.date}
              </div>
            </div>
            <div className='row mb-4'>
              <div className='col-md-6'>
                <b>Cliente: </b> {activeInvoice?.customer}
              </div>
              <div className='col-md-6'>
                <b>Tipo: </b> {activeInvoice?.payment}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12'>
                <table className='table table-bordered w-100'>
                  <thead>
                    <tr>
                      <th scope='col'>Producto</th>
                      <th scope='col'>Cant.</th>
                      <th scope='col'>Precio</th>
                      <th scope='col'>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceDetail.map((detail, i) => (
                      <tr key={i}>
                        <td className='text-left'>{detail.product ?? 'Descontinuado'}</td>
                        <td className='text-left'>{detail.quantity}</td>
                        <td className='text-left'>L. {detail.price.toFixed(2)}</td>
                        <td className='text-left'>L. {detail.subtotal.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12 text-right p-4'>
                <div>
                  <b>Subtotal: L.</b> <span className='p-2'>{totals.toFixed(2)}</span>
                </div>
                <div>
                  <b>ISV: L.</b> <span className='p-2'>{isv.toFixed(2)}</span>
                </div>
                <div>
                  <b>Total: L.</b> <span className='p-2'>{(totals + isv).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
