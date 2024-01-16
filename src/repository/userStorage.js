import { generateId } from '../plugins/id.plugin'
import { generateToken } from '../plugins/token.plugin'

// Find All Users
export const findAllUsers = () => {
  const usersInStorage = JSON.parse(localStorage.getItem('users'))
  if (!usersInStorage) return []
  return usersInStorage
}

/** Find User by Username **/
export const findUsername = (username = '') => {
  const getAllUsers = findAllUsers()
  return getAllUsers.find((user) => user.username.toLowerCase() === username.toLowerCase())
}

// Register User
export const registerUser = (user) => {
  const existsUser = findUsername(user.username)
  if (existsUser) throw 'El username no está disponible.'

  const newUser = {
    id: generateId(),
    ...user,
  }
  
  const users = findAllUsers()
  users.push(newUser)

  localStorage.setItem('users', JSON.stringify(users))
  
  const newSession = getUserSession(newUser)
  return newSession
}

// Login User
export const signInUser = (user) => {
  const getAllUsers = findAllUsers()
  if (getAllUsers.length === 0) throw 'Registre un usuario para continuar.'

  const validUser = getAllUsers.find(
    (u) => u.username === user.username && u.password === user.password
  )
  if (!validUser) throw 'Credenciales Incorrectas.'

  const newSession = getUserSession(validUser)

  return newSession
}

// Generate Session
export const getUserSession = (user) => {
  const token = generateToken(user.username)
  return {
    ...user,
    token
  }
}