import { configureStore } from '@reduxjs/toolkit'
import { uiStore } from './ui/uiStore'
import { clientStore } from './clients/clientStore'

export const store = configureStore({
  reducer: {
    ui: uiStore.reducer,
    client: clientStore.reducer,
  },
})
