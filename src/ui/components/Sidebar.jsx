import { useEffect } from 'react'
import {
  IconApi,
  IconBrandSuperhuman,
  IconDeviceAnalytics,
  IconPower,
  IconShoppingCart,
  IconUser,
} from '@tabler/icons-react'
import { useUiStore } from '../../hooks/useUiStore'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
  const { isSmallDevice, startSetDevice } = useUiStore()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 767) startSetDevice(false)
    }
    window.addEventListener('resize', handleResize)
    // dissamble component
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isSmallDevice])

  const onLogout = () => {
    console.log('Logout...')
  }

  return (
    <div className='sidebar_content'>
      <div
        className={`${
          isSmallDevice ? 'small-device-icon' : ''
        } sidebar-container bg-dark pt-4`}
      >
        <div className='nav-option p-2'>
          <NavLink
            className={({ isActive }) => `sidebar-icon ${isActive ? 'active' : ''}`}
            to={'/clientes'}
          >
            <span title='Clientes'>
              <IconUser color='white' />
            </span>
          </NavLink>
        </div>
        <div className='nav-option p-2'>
          <NavLink
            className={({ isActive }) => `sidebar-icon ${isActive ? 'active' : ''}`}
            to={'/productos'}
          >
            <span title='Productos'>
              <IconBrandSuperhuman color='white' />
            </span>
          </NavLink>
        </div>
        <div className='nav-option p-2'>
          <NavLink
            className={({ isActive }) => `sidebar-icon ${isActive ? 'active' : ''}`}
            to={'/facturas'}
          >
            <span title='Facturación'>
              <IconShoppingCart color='white' />
            </span>
          </NavLink>
        </div>
        <div className='nav-option p-2'>
          <NavLink
            className={({ isActive }) => `sidebar-icon ${isActive ? 'active' : ''}`}
            to={'/analiticas'}
          >
            <span title='Analíticas'>
              <IconDeviceAnalytics color='white' />
            </span>
          </NavLink>
        </div>
        <div className='nav-option p-2'>
          <NavLink
            className={({ isActive }) => `sidebar-icon ${isActive ? 'active' : ''}`}
            to={'/apis'}
          >
            <span title='APIs'>
              <IconApi color='white' />
            </span>
          </NavLink>
        </div>
        <div className='nav-option p-2'>
          <span className='sidebar-icon' onClick={onLogout} title='Cerrar Sesión'>
            <IconPower color='white' />
          </span>
        </div>
      </div>
    </div>
  )
}
