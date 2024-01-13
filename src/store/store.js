import { configureStore } from '@reduxjs/toolkit'
import { uiStore } from './ui/uiStore'
import { clientStore } from './clients/clientStore'
import { productStore } from './products/productStore'

export const store = configureStore({
  reducer: {
    ui: uiStore.reducer,
    client: clientStore.reducer,
    product: productStore.reducer,
  },
})
