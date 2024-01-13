import { useDispatch, useSelector } from 'react-redux'
import { findAllProducts } from "../repository/productsStore"
import { onLoadProducts } from "../store/products/productStore"

export const useProductStore = () => {
  const { activeProduct, products, isLoadingProducts, message } = useSelector(
    (state) => state.product
  )
  const dispatch = useDispatch()

  // Start Loading Products
  const startLoadingProducts = () => {
    const allProducts = findAllProducts()
    dispatch(onLoadProducts(allProducts))
  }

  return {
    // props
    activeProduct,
    products,
    isLoadingProducts,
    message,

    // methods
    startLoadingProducts
  }
}
