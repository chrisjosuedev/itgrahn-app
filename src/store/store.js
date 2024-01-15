import { configureStore } from '@reduxjs/toolkit'
import { clientStore } from './clients/clientStore'
import { invoiceStore } from './invoices/invoiceStore'
import { productStore } from './products/productStore'
import { uiStore } from './ui/uiStore'

export const store = configureStore({
  reducer: {
    ui: uiStore.reducer,
    client: clientStore.reducer,
    invoice: invoiceStore.reducer,
    product: productStore.reducer,
  },
})
