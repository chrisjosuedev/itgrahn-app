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
        if (!exists) state.products.push(product)
      })
      state.isLoadingProducts = false
    },
    onAddNewProduct: (state, { payload }) => {
      state.products.push(payload.productSaved)
      state.message = payload.message
    },
    onUpdateProduct: (state, { payload }) => {
      state.products = state.products.map((product) => {
        if (product.id === payload.productUpdated.id) return payload.productUpdated
        return product
      })
      state.message = payload.message
    },
    onDeleteProduct: (state, { payload }) => {
      state.products = state.products.filter(
        (product) => product.id !== state.activeProduct.id
      )
      state.message = payload
    },
    onSetActiveProduct: (state, { payload }) => {
      state.activeProduct = payload
    },
    onSetProductMessage: (state, { payload }) => {
      state.message = payload
    },
    onClearProductMessage: (state) => {
      state.message = undefined
    },
  },
})

export const {
  onLoadProducts,
  onSetActiveProduct,
  onAddNewProduct,
  onSetProductMessage,
  onClearProductMessage,
  onUpdateProduct,
} = productStore.actions
