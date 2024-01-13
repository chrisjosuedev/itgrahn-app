import { generateId } from '../plugins/id.plugin'

/** Save Client **/
export const saveClient = (client) => {
  const existsClient = findByRtn(client.rtn)
  if (existsClient) throw 'Existe un cliente con el mismo RTN.'

  const newClient = {
    id: generateId(),
    ...client,
  }

  const clients = findAllClients()
  clients.push(newClient)

  localStorage.setItem('clients', JSON.stringify(clients))

  return newClient
}

/** Find All Client **/
export const findAllClients = () => {
  const clientsInStorage = JSON.parse(localStorage.getItem('clients'))
  if (!clientsInStorage) return []
  return clientsInStorage
}

/** Find Client By RTN **/
export const findByRtn = (rtn = '') => {
  const getAllClients = findAllClients()
  return getAllClients.find((client) => client.rtn === rtn)
}

/** Find Client By Id **/
export const findById = (id = '') => {
  const getAllClients = findAllClients()
  return getAllClients.find((client) => client.id === id)
}

