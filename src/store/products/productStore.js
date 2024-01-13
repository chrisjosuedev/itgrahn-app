import { createSlice } from '@reduxjs/toolkit'

export const productStore = createSlice({
  name: 'product',
  initialState: {
    activeProduct: null,
    products: [],
    isLoadingProducts: true,
    message: undefined,
  },
  reducers: {
    onLoadProducts: (state, { payload }) => {
      payload.forEach((product) => {
        const exists = state.products.some((inStore) => inStore.id === product.id)
        if (!exists) state.clients.push(product)
      })
      state.isLoadingProducts = false
    },
  },
})

export const { onLoadProducts } = productStore.actions
