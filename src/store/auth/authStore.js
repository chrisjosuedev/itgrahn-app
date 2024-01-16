import { createSlice } from '@reduxjs/toolkit'

export const authStore = createSlice({
  name: 'auth',
  initialState: {
    currentStatus: 'checking', // 'authenticated' || 'not-authenticated'
    user: {},
    message: undefined,
  },
  reducers: {
    onChecking: (state) => {
      state.currentStatus = 'checking'
      state.user = {}
      state.message = undefined
    },
    onLogin: (state, { payload }) => {
      state.currentStatus = 'authenticated'
      state.user = payload
    },
    onLogout: (state) => {
      state.currentStatus = 'not-authenticated'
      state.user = {}
      state.message = undefined
    },
    onSetAuthMessage: (state, { payload }) => {
      state.message = payload
    },
    onClearAuthMessages: (state) => {
      state.message = undefined
    },
  },
})

export const {
  onChecking,
  onLogin,
  onLogout,
  onClearAuthMessages,
  onSetAuthMessage,
} = authStore.actions
