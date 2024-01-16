import { useDispatch, useSelector } from 'react-redux'
import { registerUser, signInUser } from '../repository/userStorage'
import {
  onChecking,
  onClearAuthMessages,
  onLogin,
  onLogout,
  onSetAuthMessage,
} from '../store/auth/authStore'
import { onLogoutClient } from "../store/clients/clientStore"
import { onLogoutData } from "../store/data/dataStore"
import { onLogoutInvoices } from "../store/invoices/invoiceStore"
import { onLogoutProducts } from "../store/products/productStore"

export const useAuthStore = () => {
  const { currentStatus, user, message } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // Start Logout
  const startLogout = () => {
    const token = localStorage.getItem('token')
    if (!token) return dispatch(onLogout(message))

    // If token exists...
    localStorage.removeItem('token')
    localStorage.removeItem('session')

    // Clean States...
    dispatch(onLogoutClient())
    dispatch(onLogoutData())
    dispatch(onLogoutInvoices())
    dispatch(onLogoutProducts())
    // Logout the App
    dispatch(onLogout())
  }

  // Start Sign In
  const startSignIn = (user) => {
    try {
      const { password, token, ...profile } = signInUser(user)
      
      localStorage.setItem('token', token)
      localStorage.setItem('session', JSON.stringify(profile))
      dispatch(onLogin(profile))
      return true
    } catch (error) {
      dispatch(onSetAuthMessage(error))
      setTimeout(() => {
        dispatch(onClearAuthMessages())
      }, 3000)
    }
  }

  // Start Sign Up
  const startSignUp = (user) => {
    try {
      const { password, token, ...profile } = registerUser(user)
      localStorage.setItem('token', token)
      localStorage.setItem('session', JSON.stringify(profile))
      dispatch(onLogin(profile))
      return true
    } catch (error) {
      dispatch(onSetAuthMessage(error))
      setTimeout(() => {
        dispatch(onClearAuthMessages())
      }, 3000)
    }
  }

  // Check Token and Refreshing Session
  const startCheckingToken = () => {
    dispatch(onChecking())
    const token = localStorage.getItem('token')
    const session = localStorage.getItem('session')
    if (!token || !session) return dispatch(onLogout())

    const userInSession = JSON.parse(session)
    dispatch(onLogin(userInSession))
  }

  return {
    // props
    currentStatus,
    user,
    message,

    // methods
    startSignUp,
    startSignIn,
    startCheckingToken,
    startLogout
  }
}
