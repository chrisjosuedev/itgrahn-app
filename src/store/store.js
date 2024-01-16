import { configureStore } from '@reduxjs/toolkit'
import { clientStore } from './clients/clientStore'
import { invoiceStore } from './invoices/invoiceStore'
import { productStore } from './products/productStore'
import { uiStore } from './ui/uiStore'
import { dataStore } from "./data/dataStore"
import { authStore } from "./auth/authStore"

export const store = configureStore({
  reducer: {
    auth: authStore.reducer,
    ui: uiStore.reducer,
    client: clientStore.reducer,
    data: dataStore.reducer,
    invoice: invoiceStore.reducer,
    product: productStore.reducer,
  },
})
