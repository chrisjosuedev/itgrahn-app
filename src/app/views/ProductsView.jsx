import { useEffect, useMemo } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { useUiStore } from '../../hooks/useUiStore'
import { Message } from '../components/Message'
import { SpinnerLoader } from '../components/SpinnerLoader'
import { ProductsModal } from '../components/products/ProductsModal'
import { useProductStore } from '../../hooks/useProductStore'
import { ProductsTable } from '../components/products/ProductsTable'

export const ProductsView = () => {
  const { startOpenModal } = useUiStore()
  const { products, startLoadingProducts, isLoadingProducts } = useProductStore()

  useEffect(() => {
    startLoadingProducts()
  }, [])

  // Render Message or Clients
  const renderProducts = useMemo(() => {
    if (products.length === 0)
      return <Message message={'No parece haber nada por aquí... 😔'} type='dark' />
    return <ProductsTable data={products} />
  }, [products])

  const onAddNewProduct = () => {
    // start setting Product
    startOpenModal()
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='view-title'>PRODUCTOS</h1>
          <hr />
          <button onClick={onAddNewProduct} className='btn btn-primary mt-4'>
            <IconPlus color='white' /> NUEVO
          </button>
        </div>
        <div className='col-md-12 mt-4'>
          {isLoadingProducts ? <SpinnerLoader /> : renderProducts}
        </div>
      </div>
      <ProductsModal />
    </div>
  )
}
