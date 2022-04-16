import { Outlet } from 'react-router-dom'
import { useAuth } from '../../common/providers/auth.provider'
import { Navbar } from '../navbar'

export const AppLayout = () => {
  const { getUser } = useAuth()

  return (
    <>
      <Navbar />
      <div className="container-fluid row" style={{ height: '90vh' }}>
        <Outlet />
      </div>
    </>
  )
}
