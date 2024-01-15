import { useDispatch, useSelector } from 'react-redux'
import { onAddToCart, onDeleteItemInCart, onUpdateCart } from '../store/invoices/invoiceStore'

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

  return {
    // props
    cart,
    message,

    // methods
    startAddingToCart,
    startUpdatingItemInCart,
    startDeletingItemInCart
  }
}
