import { createSlice } from '@reduxjs/toolkit'

export const clientStore = createSlice({
  name: 'client',
  initialState: {
    activeClient: null,
    clients: [],
    isLoadingClients: true,
    message: undefined,
  },
  reducers: {
    onLoadClients: (state, { payload }) => {
      payload.forEach((client) => {
        const exists = state.clients.some((inStore) => inStore.id === client.id)
        if (!exists) state.clients.push(client)
      })
      state.isLoadingClients = false
    },
    onAddNewClient: (state, { payload }) => {
      state.clients.push(payload.clientSaved)
      state.message = payload.message
    },
    onSetActiveClient: (state, { payload }) => {
      state.activeClient = payload
    },
    onSetClientMessage: (state, { payload }) => {
      state.message = payload
    },
    onClearClientMessage: (state) => {
      state.message = undefined
    },
  },
})

export const {
  onAddNewClient,
  onSetActiveClient,
  onSetClientMessage,
  onClearClientMessage,
  onLoadClients,
} = clientStore.actions
