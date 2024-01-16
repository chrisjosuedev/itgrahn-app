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
    onLogoutData: (state) => {
      state.paymentAnalitica = undefined
    },
  },
})

export const { onAddPaymentAnalitica, onLogoutData } = dataStore.actions
