import { useDispatch, useSelector } from 'react-redux'
import { onAddInvoice, onAddToCart, onCleanCart, onDeleteItemInCart, onUpdateCart } from '../store/invoices/invoiceStore'
import { saveInvoice } from "../repository/invoiceStorage"
import { onUpdateStock } from "../store/products/productStore"

export const useInvoiceStore = () => {
  const { cart, message } = useSelector((state) => state.invoice)
  const dispatch = useDispatch()

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

  const startRemoveCart = () => {
    dispatch(onCleanCart())
  }

  return {
    // props
    cart,
    message,

    // methods
    startAddingToCart,
    startUpdatingItemInCart,
    startDeletingItemInCart,
    startAddingInvoice,
    startRemoveCart
  }
}
