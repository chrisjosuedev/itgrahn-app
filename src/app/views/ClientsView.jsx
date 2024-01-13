import { IconPlus } from '@tabler/icons-react'
import { useUiStore } from '../../hooks/useUiStore'
import { ClientsModal } from '../components/clients/ClientsModal'
import { useClientStore } from '../../hooks/useClientStore'
import { useEffect, useMemo } from 'react'
import { Message } from '../components/Message'
import { ClientsTable } from '../components/clients/ClientsTable'
import { SpinnerLoader } from '../components/SpinnerLoader'

export const ClientsView = () => {
  const { startOpenModal } = useUiStore()
  const { clients, isLoadingClients, startSetClient, startLoadingClients } = useClientStore()

  useEffect(() => {
    startLoadingClients()
  }, [])

  // Render Messages or User Reviews
  const renderClients = useMemo(() => {
    if (clients.length === 0)
      return <Message message={'No parece haber nada por aquí... 😔'} type='dark' />
    return <ClientsTable data={clients} />
  }, [clients])

  const onAddNewClient = () => {
    startSetClient({
      rtn: '',
      fullName: '',
      address: '',
    })
    startOpenModal()
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-12'>
          <h1>Clientes</h1>
          <hr />
          <button onClick={onAddNewClient} className='btn btn-primary mt-4'>
            <IconPlus color='white' /> AGREGAR
          </button>
        </div>
        <div className='col-md-12 mt-4'>
          {isLoadingClients ? <SpinnerLoader /> : renderClients}
        </div>
      </div>
      <ClientsModal />
    </div>
  )
}
