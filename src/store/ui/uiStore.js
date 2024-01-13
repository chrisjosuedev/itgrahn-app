import { createSlice } from '@reduxjs/toolkit'

export const uiStore = createSlice({
  name: 'ui',
  initialState: {
    isSmallDevice: false,
    isOpenModal: false
  },
  reducers: {
    onSetIsSmallDevice: (state, { payload }) => {
      state.isSmallDevice = payload
    },
    onOpenModal: (state) => {
      state.isOpenModal = true
    },
    onCloseModal: (state) => {
      state.isOpenModal = false
    }
  },
})

export const { onSetIsSmallDevice, onOpenModal, onCloseModal } =
  uiStore.actions
