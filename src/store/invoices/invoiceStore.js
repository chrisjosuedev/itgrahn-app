import { createSlice } from '@reduxjs/toolkit'

export const invoiceStore = createSlice({
  name: 'invoice',
  initialState: {
    cart: [],
    invoice: [],
    invoiceDetail: [],
    message: undefined,
  },
  reducers: {
    onAddToCart: (state, { payload }) => {
      const exists = state.cart.some((item) => item.productId === payload.productId)
      if (!exists) state.cart.push(payload)
    },
    onUpdateCart: (state, { payload }) => {
      state.cart = state.cart.map((item) => {
        if (item.productId === payload.id) item.subtotal = item.price * payload.value
        return item
      })
    },
    onDeleteItemInCart: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.productId !== payload)
    },
    onAddInvoice: (state, { payload }) => {
      state.invoice.push(payload.invoice)
      state.invoiceDetail.push(payload.invoiceDetail)
    }
  },
})

export const { onAddToCart, onUpdateCart, onDeleteItemInCart, onAddInvoice } = invoiceStore.actions
