import { useDispatch, useSelector } from "react-redux"
import { getAllAmountPaymentType } from "../repository/invoiceStorage"
import { onAddPaymentAnalitica } from "../store/data/dataStore"

export const useDataStore = () => {
  const { paymentAnalitica } = useSelector(state => state.data)
  const dispatch = useDispatch()

  // Start Loading Analitics
  const startLoadingAnalitics = () => {
    const payments = getAllAmountPaymentType()
    if (!payments) return
    dispatch(onAddPaymentAnalitica(payments))
  }
  
  return {
    // props
    paymentAnalitica,

    // methods
    startLoadingAnalitics
  }
}
