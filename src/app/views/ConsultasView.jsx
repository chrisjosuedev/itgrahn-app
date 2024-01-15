import { useEffect, useMemo } from 'react'
import { useInvoiceStore } from '../../hooks/useInvoiceStore'
import { Message } from '../components/Message'
import { InvoicesTable } from '../components/invoices/InvoicesTable'
import { SpinnerLoader } from '../components/SpinnerLoader'
import { InvoicesModal } from "../components/invoices/InvoicesModal"

export const ConsultasView = () => {
  const { isLoadingInvoices, startLoadingInvoices, allInvoices } = useInvoiceStore()

  useEffect(() => {
    startLoadingInvoices()
  })

  // Render Messages or Invoices
  const renderInvoices = useMemo(() => {
    if (allInvoices.length === 0)
      return <Message message={'No parece haber nada por aquí... 😔'} type='dark' />
    return <InvoicesTable data={allInvoices} />
  }, [allInvoices])

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='view-title'>LISTADO DE VENTAS</h1>
          <hr />
        </div>
        <div className='col-md-12 mt-4'>
          {isLoadingInvoices ? <SpinnerLoader /> : renderInvoices}
        </div>
      </div>
      <InvoicesModal />
    </div>
  )
}
