import { Navbar } from '../../ui/components/NavBar'
import { Sidebar } from '../../ui/components/Sidebar'

export const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='global'>
        <Sidebar />
        <div className='container-fluid main'>{children}</div>
      </div>
    </>
  )
}
