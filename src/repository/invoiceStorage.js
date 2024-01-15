import { generateId } from '../plugins/id.plugin'

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

  localStorage.setItem('invoices', JSON.stringify(allInvoices))
  return newInvoice
}

// Get All Invoices
export const findAllInvoices = () => {
  const invoicesInStorage = JSON.parse(localStorage.getItem('invoices'))
  if (!invoicesInStorage) return []
  return invoicesInStorage
}
