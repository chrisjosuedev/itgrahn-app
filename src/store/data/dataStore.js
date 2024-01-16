import { createSlice } from '@reduxjs/toolkit'

export const dataStore = createSlice({
  name: 'data',
  initialState: {
    paymentAnalitica: undefined,
  },
  reducers: {
    onAddPaymentAnalitica: (state, { payload }) => {
      state.paymentAnalitica = payload
    },
  },
})

export const { onAddPaymentAnalitica } = dataStore.actions
