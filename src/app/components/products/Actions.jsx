import Swal from 'sweetalert2'

import { useUiStore } from '../../../hooks/useUiStore'
import { alertInfo } from '../../../helpers/SweetAlertProps'
import { IconEdit, IconTrashOff } from '@tabler/icons-react'
import { useProductStore } from '../../../hooks/useProductStore'

export const Actions = ({ values }) => {
  const { startOpenModal } = useUiStore()
  const { startFindingProduct, startDeletingProduct } = useProductStore()

  const onUpdate = (id) => {
    startFindingProduct(id)
    startOpenModal()
  }

  const onDelete = (id) => {
    startFindingProduct(id)
    const logoutInfo = alertInfo('¿Seguro que desea eliminar el producto?', 'info', 'Si')
    Swal.fire(logoutInfo).then((result) => {
      if (result.isConfirmed) return startDeletingProduct(id)
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
