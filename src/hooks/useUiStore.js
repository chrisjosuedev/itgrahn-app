import { useDispatch, useSelector } from 'react-redux'
import {
  onCloseModal,
  onOpenModal,
  onSetIsSmallDevice,
} from '../store/ui/uiStore'

export const useUiStore = () => {
  const { isSmallDevice, isOpenModal } = useSelector((state) => state.ui)
  const dispatch = useDispatch()

  // Setting Device to Small
  const startSetDevice = (isSmall) => {
    dispatch(onSetIsSmallDevice(isSmall))
  }

  // Open Modal
  const startOpenModal = () => {
    dispatch(onOpenModal())
  }

  // Close Modal
  const startCloseModal = () => {
    dispatch(onCloseModal())
  }

  return {
    // Props
    isSmallDevice,
    isOpenModal,

    // Methods
    startSetDevice,
    startOpenModal,
    startCloseModal,
  }
}
