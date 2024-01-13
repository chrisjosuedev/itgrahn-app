import { generateId } from '../plugins/id.plugin'

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

/** Update Client */
export const updateClient = (client) => {
  const existsClient = findByRtn(client.rtn)
  if (existsClient && existsClient.id !== client.id) throw 'Existe un cliente con el mismo RTN.'

  const getAllClients = findAllClients()
  const clients = getAllClients.map((currentClient) => {
    if (currentClient.id === client.id) return client;
    return currentClient;
  })
  localStorage.setItem('clients', JSON.stringify(clients))
  return client
}

/** Delete Client */
export const deleteClient = (id) => {
  const getAllClients = findAllClients()
  const clients = getAllClients.filter((client) => client.id !== id)
  localStorage.setItem('clients', JSON.stringify(clients))
}
