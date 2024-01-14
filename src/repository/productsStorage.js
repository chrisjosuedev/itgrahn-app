import { generateId } from '../plugins/id.plugin'

/** Find All Products **/
export const findAllProducts = () => {
  const productsInStorage = JSON.parse(localStorage.getItem('products'))
  if (!productsInStorage) return []
  return productsInStorage
}

/** Find Product By Name **/
export const findProductByName = (productName = '') => {
  const getAllProducts = findAllProducts()
  return getAllProducts.find(
    (product) => product.productName.toLowerCase() === productName.toLowerCase()
  )
}

/** Find Product by ID */
export const findByProductId = (id) => {
  const getAllProducts = findAllProducts()
  return getAllProducts.find((product) => product.id === id)
}

/** Save Product Name */
export const saveProduct = (product) => {
  const existsProduct = findProductByName(product.productName)
  if (existsProduct) throw 'Existe un producto con el mismo nombre.'

  const newProduct = {
    id: generateId(),
    ...product,
  }

  const products = findAllProducts()
  products.push(newProduct)

  localStorage.setItem('products', JSON.stringify(products))

  return newProduct
}

/** Update Product */
export const updateProduct = (product) => {
  const existsProduct = findProductByName(product.productName)
  if (existsProduct && existsProduct.id !== product.id)
    throw 'Existe un producto con el mismo nombre.'

  const getAllProducts = findAllProducts()

  const products = getAllProducts.map((currentProduct) => {
    if (currentProduct.id === product.id) return product
    return currentProduct
  })

  localStorage.setItem('products', JSON.stringify(products))
  return product
}

/** Delete Product */
export const deleteProduct = (id) => {
  const getAllProduct = findAllProducts()
  const products = getAllProduct.filter((product) => product.id !== id)
  localStorage.setItem('products', JSON.stringify(products))
}
