import { useDispatch, useSelector } from 'react-redux'
import {
  onAddInvoice,
  onAddToCart,
  onCleanCart,
  onDeleteItemInCart,
  onLoadInvoices,
  onSetActiveInvoice,
  onSetInvoiceDetail,
  onUpdateCart,
} from '../store/invoices/invoiceStore'
import { getAllInvoices, getInvoiceDetailById, saveInvoice } from '../repository/invoiceStorage'
import { onUpdateStock } from '../store/products/productStore'

export const useInvoiceStore = () => {
  const { cart, invoiceDetail, activeInvoice, allInvoices, isLoadingInvoices } = useSelector(
    (state) => state.invoice
  )
  const dispatch = useDispatch()

  // Start Loading Invoices
  const startLoadingInvoices = () => {
    const allInvoices = getAllInvoices()
    dispatch(onLoadInvoices(allInvoices))
  }

  // Start Finding Invoice Detail
  const startFindingInvoice = (id) => {
    const details = getInvoiceDetailById(id)
    dispatch(onSetActiveInvoice(id))
    dispatch(onSetInvoiceDetail(details))
  }

  // Start Updating in Set Active
  const startUpdatingItemInCart = (id, value) => {
    dispatch(onUpdateCart({ id, value }))
  }

  // Start Adding new Item
  const startAddingToCart = (item) => {
    const { quantity, price, ...rest } = item
    dispatch(
      onAddToCart({
        ...rest,
        quantity,
        price,
        subtotal: quantity * price,
      })
    )
  }

  // Start Deleting Item in Cart
  const startDeletingItemInCart = (id) => {
    dispatch(onDeleteItemInCart(id))
  }

  // Start processing Invoice
  const startAddingInvoice = (invoice) => {
    const invoiceGenerated = saveInvoice(invoice)
    dispatch(onAddInvoice(invoiceGenerated))
    dispatch(onUpdateStock(invoiceGenerated.detail))
    return true
  }

  // Remove All Cart
  const startRemoveCart = () => {
    dispatch(onCleanCart())
  }

  return {
    // props
    cart,
    allInvoices,
    isLoadingInvoices,
    invoiceDetail,
    activeInvoice,

    // methods
    startAddingToCart,
    startUpdatingItemInCart,
    startDeletingItemInCart,
    startAddingInvoice,
    startRemoveCart,
    startLoadingInvoices,
    startFindingInvoice,
  }
}
