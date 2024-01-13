import Swal from 'sweetalert2'

import { useUiStore } from '../../../hooks/useUiStore'
import { alertInfo } from '../../../helpers/SweetAlertProps'
import { IconEdit, IconTrashOff } from '@tabler/icons-react'
import { useClientStore } from '../../../hooks/useClientStore'

export const Actions = ({ values }) => {
  const { startOpenModal } = useUiStore()
  const { startFindingClient, startDeletingClient } = useClientStore()

  const onUpdate = (id) => {
    startFindingClient(id)
    startOpenModal()
  }

  const onDelete = (id) => {
    startFindingClient(id)
    const logoutInfo = alertInfo('¿Seguro que desea eliminar al cliente?', 'info', 'Si')
    Swal.fire(logoutInfo).then((result) => {
      if (result.isConfirmed) return startDeletingClient(id)
    })
  }

  return (
    <>
      <button onClick={() => onUpdate(values)} className='btn btn-dark mr-2 mt-2'>
        <IconEdit color='white' />
      </button>
      <button className='btn btn-danger mt-2' onClick={() => onDelete(values)}>
        <IconTrashOff color='white' />
      </button>
    </>
  )
}
