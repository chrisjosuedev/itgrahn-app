import { IconMenu2 } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { useUiStore } from "../../hooks/useUiStore"
import { useAuthStore } from "../../hooks/useAuthStore"

export const Navbar = () => {

  const { isSmallDevice, startSetDevice } = useUiStore()
  const { user } = useAuthStore()

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <Link to={'/'} className='navbar-brand'>
        <img src='/assets/logo.png' className='img-logo' alt='logo' width={'30px'} />
        <span className='brand'>
          <b> Invoice App </b>
        </span>
      </Link>
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item text-white mr-4'>
          Online: <span className='text-success'>{user.username}</span>
        </li>
      </ul>
      <span onClick={() => startSetDevice(!isSmallDevice)} className='sidebar-icon small-device-icon' title='Collapse'>
        <IconMenu2 color='white' />
      </span>
    </nav>
  )
}
