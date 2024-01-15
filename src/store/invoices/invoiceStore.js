import { createSlice } from '@reduxjs/toolkit'

export const invoiceStore = createSlice({
  name: 'invoice',
  initialState: {
    cart: [],
    invoices: [],
  },
  reducers: {
    onAddToCart: (state, { payload }) => {
      const exists = state.cart.some((item) => item.productId === payload.productId)
      if (!exists) state.cart.push(payload)
    },
    onUpdateCart: (state, { payload }) => {
      state.cart = state.cart.map((item) => {
        if (item.productId === payload.id) {
          item.subtotal = item.price * payload.value
          item.quantity = payload.value
        }
        return item
      })
    },
    onDeleteItemInCart: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.productId !== payload)
    },
    onAddInvoice: (state, { payload }) => {
      state.invoices.push(payload)
      state.cart = []
    },
    onCleanCart: (state) => {
      state.cart = []
    },
  },
})

export const { onAddToCart, onUpdateCart, onDeleteItemInCart, onAddInvoice, onCleanCart } =
  invoiceStore.actions
