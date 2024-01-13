import { useDispatch, useSelector } from 'react-redux'
import {
  onAddNewClient,
  onClearClientMessage,
  onLoadClients,
  onSetActiveClient,
  onSetClientMessage,
} from '../store/clients/clientStore'
import { findAllClients, saveClient } from '../repository/clientsStorage'

export const useClientStore = () => {
  const { activeClient, clients, isLoadingClients, message } = useSelector((state) => state.client)
  const dispatch = useDispatch()

  // Load Clients
  const startLoadingClients = () => {
    const allClients = findAllClients()
    dispatch(onLoadClients(allClients))
  }

  // Set Active Client
  const startSetClient = (client) => {
    dispatch(onSetActiveClient(client))
  }

  // Start Saving Client
  const startSavingClient = (client) => {
    try {
      if (client.uuid) {
        //update...
        return
      }
      const clientSaved = saveClient(client)
      dispatch(
        onAddNewClient({
          clientSaved,
          message: `Cliente: ${clientSaved.fullName}, guardado con éxito.`,
        })
      )
      setTimeout(() => {
        dispatch(onClearClientMessage())
      }, 3000)
      return true
    } catch (error) {
      dispatch(onSetClientMessage(error))
      setTimeout(() => {
        dispatch(onClearClientMessage())
      }, 3000)
    }
  }

  return {
    // props
    activeClient,
    clients,
    isLoadingClients,
    message,

    // methods
    startLoadingClients,
    startSetClient,
    startSavingClient,
  }
}
