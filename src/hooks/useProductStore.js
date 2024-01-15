import { useDispatch, useSelector } from 'react-redux'
import {
  deleteProduct,
  findAllProducts,
  findByProductId,
  saveProduct,
  updateProduct,
} from '../repository/productsStorage'
import {
  onAddNewProduct,
  onClearProductMessage,
  onDeleteProduct,
  onLoadProducts,
  onSetActiveProduct,
  onSetProductMessage,
  onUpdateProduct,
} from '../store/products/productStore'

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

  // Start Setting Product
  const startSetProduct = (product) => {
    dispatch(onSetActiveProduct(product))
  }

  // Start Finding Product
  const startFindingProduct = (id) => {
    const productFound = findByProductId(id)
    dispatch(onSetActiveProduct(productFound))
  }

  // Start Saving Product
  const startSavingProduct = (product) => {
    try {
      if (product.id) {
        // Update
        const productUpdated = updateProduct(product)
        dispatch(
          onUpdateProduct({
            productUpdated,
            message: `Producto: ${productUpdated.productName}, actualizado con éxito.`,
          })
        )
        setTimeout(() => {
          dispatch(onClearProductMessage())
        }, 3000)
        return true
      }

      // Save
      const productSaved = saveProduct(product)
      dispatch(
        onAddNewProduct({
          productSaved,
          message: `Producto: ${productSaved.productName}, guardado con éxito.`,
        })
      )
      setTimeout(() => {
        dispatch(onClearProductMessage())
      }, 3000)
      return true
    } catch (error) {
      dispatch(onSetProductMessage(error))
      setTimeout(() => {
        dispatch(onClearProductMessage())
      }, 3000)
    }
  }

  // Start Deleting Product
  const startDeletingProduct = (id) => {
    deleteProduct(id)
    dispatch(onDeleteProduct('Producto Eliminado con éxito.'))
    setTimeout(() => {
      dispatch(onClearProductMessage())
    }, 3000)
  }

  return {
    // props
    activeProduct,
    products,
    isLoadingProducts,
    message,

    // methods
    startLoadingProducts,
    startSetProduct,
    startSavingProduct,
    startFindingProduct,
    startDeletingProduct,
  }
}
