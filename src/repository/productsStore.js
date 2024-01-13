export const findAllProducts = () => {
  const productsInStorage = JSON.parse(localStorage.getItem('products'))
  if (!productsInStorage) return []
  return productsInStorage
}
