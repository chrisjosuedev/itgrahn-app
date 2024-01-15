import { IconListDetails } from '@tabler/icons-react'
import { useUiStore } from "../../../hooks/useUiStore"
import { useInvoiceStore } from "../../../hooks/useInvoiceStore"

export const Actions = ({ values }) => {
  
  const { startFindingInvoice } = useInvoiceStore()
  const { startOpenModal  } = useUiStore()
  
  const onInvoiceDetail = (values) => {
    startFindingInvoice(values);
    startOpenModal();
  }

  return (
    <>
      <button onClick={() => onInvoiceDetail(values)} className='btn btn-dark'>
        <IconListDetails color='white' />
      </button>
    </>
  )
}
