import { createSlice } from '@reduxjs/toolkit'

export const invoiceStore = createSlice({
  name: 'invoice',
  initialState: {
    cart: [],
    invoices: [],
    allInvoices: [],
    invoiceDetail: [],
    activeInvoice: null,
    isLoadingInvoices: true,
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
    onLoadInvoices: (state, { payload }) => {
      payload.forEach((invoice) => {
        const exists = state.allInvoices.some(
          (invoiceInStore) => invoiceInStore.id === invoice.id
        )
        if (!exists) state.allInvoices.push(invoice)
      })
      state.isLoadingInvoices = false
    },
    onSetActiveInvoice: (state, { payload }) => {
      state.activeInvoice = state.allInvoices.find((invoice) => invoice.id === payload)
    },
    onSetInvoiceDetail: (state, { payload }) => {
      state.invoiceDetail = payload
    },
    onLogoutInvoices: (state) => {
      state.cart = []
      state.invoices = []
      state.allInvoices = []
      state.invoiceDetail = []
      state.activeInvoice = null
      state.isLoadingInvoices = true
    },
  },
})

export const {
  onAddToCart,
  onUpdateCart,
  onDeleteItemInCart,
  onAddInvoice,
  onCleanCart,
  onLoadInvoices,
  onSetActiveInvoice,
  onSetInvoiceDetail,
  onLogoutInvoices,
} = invoiceStore.actions
