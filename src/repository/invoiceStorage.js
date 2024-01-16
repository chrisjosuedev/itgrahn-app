import { getEnvVariables } from '../helpers/getEnvVariables'
import { formatDate } from '../plugins/dateFormatter.plugin'
import { generateId } from '../plugins/id.plugin'
import { findByRtn } from './clientsStorage'
import { findByProductId, updateProductStock } from './productsStorage'

const { VITE_ISV: ISV } = getEnvVariables()

// Save Invoice
export const saveInvoice = (invoice) => {
  const { detail: cart, clientId, ...rest } = invoice

  const detail = cart.map((item) => {
    const { product, ...restInvoice } = item
    return { ...restInvoice }
  })

  const newInvoice = {
    id: generateId(),
    customerRtn: !clientId ? 'N/D' : clientId,
    detail,
    ...rest,
  }

  const allInvoices = findAllInvoices()
  allInvoices.push(newInvoice)

  // Update Stock
  detail.forEach(({ productId, quantity }) => {
    updateProductStock(productId, quantity)
  })

  localStorage.setItem('invoices', JSON.stringify(allInvoices))

  return newInvoice
}

// Get All Invoices
export const findAllInvoices = () => {
  const invoicesInStorage = JSON.parse(localStorage.getItem('invoices'))
  if (!invoicesInStorage) return []
  return invoicesInStorage
}

// Get All Formatted Invoices
export const getAllInvoices = () => {
  const invoicesInStorage = findAllInvoices()

  const invoicesFormatted = invoicesInStorage.map(({ id, customerRtn, payment, date }) => {
    const customerName = findByRtn(customerRtn)
    return {
      id,
      customer: customerName ? customerName.fullName : 'Genérico',
      payment: payment ? 'Efectivo' : 'Crédito',
      date: formatDate(date),
    }
  })

  return invoicesFormatted
}

// Get Invoice Detail By Id
export const getInvoiceDetailById = (id) => {
  const invoicesInStorage = findAllInvoices()
  const detailsByInvoice = invoicesInStorage
    .find((invoice) => invoice.id === id)
    .detail?.map((item) => {
      return {
        product: findByProductId(item.productId)?.productName,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
      }
    })
  return detailsByInvoice
}

// Get total by Payment Method
export const getAmountByPaymentType = (type) => {
  const invoicesInStorage = findAllInvoices()

  const amount = invoicesInStorage
    .filter((invoice) => invoice.payment === type)
    .map((item) => item.detail.reduce((prev, curr) => prev + curr.subtotal, 0))
    .reduce((prev, curr) => prev + curr, 0)

  return amount
}

// Find Credit/Cash Total
export const getAllAmountPaymentType = () => {
  const cashNet = getAmountByPaymentType(true)
  const creditNet = getAmountByPaymentType(false)

  if (cashNet === 0 && creditNet === 0) return null

  return {
    cash: cashNet * ISV + cashNet,
    credit: creditNet * ISV + creditNet,
  }
}
