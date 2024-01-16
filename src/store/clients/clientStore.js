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
    onUpdateClient: (state, { payload }) => {
      state.clients = state.clients.map((client) => {
        if (client.id === payload.clientUpdated.id) return payload.clientUpdated
        return client
      })
      state.message = payload.message
    },
    onDeleteClient: (state, { payload }) => {
      state.clients = state.clients.filter((client) => client.id !== state.activeClient.id)
      state.message = payload
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
    onLogoutClient: (state) => {
      state.activeClient = null
      state.clients = []
      state.isLoadingClients = true
      state.message = undefined
    },
  },
})

export const {
  onAddNewClient,
  onSetActiveClient,
  onSetClientMessage,
  onDeleteClient,
  onClearClientMessage,
  onLoadClients,
  onUpdateClient,
  onLogoutClient,
} = clientStore.actions
