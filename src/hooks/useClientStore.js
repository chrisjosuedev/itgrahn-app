import { useDispatch, useSelector } from 'react-redux'
import {
  onAddNewClient,
  onClearClientMessage,
  onDeleteClient,
  onLoadClients,
  onSetActiveClient,
  onSetClientMessage,
  onUpdateClient,
} from '../store/clients/clientStore'
import {
  deleteClient,
  findAllClients,
  findById,
  saveClient,
  updateClient,
} from '../repository/clientsStorage'

export const useClientStore = () => {
  const { activeClient, clients, isLoadingClients, message } = useSelector(
    (state) => state.client
  )
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

  // Finding and Set Acive Client
  const startFindingClient = (id) => {
    const clientFound = findById(id)
    dispatch(onSetActiveClient(clientFound))
  }

  // Start Saving Client
  const startSavingClient = (client) => {
    try {
      if (client.id) {
        const clientUpdated = updateClient(client)
        dispatch(
          onUpdateClient({
            clientUpdated,
            message: `Cliente: ${clientUpdated.fullName}, actualizado con éxito.`,
          })
        )
        setTimeout(() => {
          dispatch(onClearClientMessage())
        }, 3000)
        return true
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

  // Start Deleting Client
  const startDeletingClient = (id) => {
    deleteClient(id)
    dispatch(onDeleteClient('Cliente Eliminado con éxito.'))
    setTimeout(() => {
      dispatch(onClearClientMessage())
    }, 3000)
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
    startFindingClient,
    startDeletingClient,
  }
}
