import { Outlet } from 'react-router-dom'
import { Navbar } from '../navbar'

export const AppLayout = () => (
  <div
    className="page-wrapper with-navbar with-sidebar"
    data-sidebar-type="overlayed-sm-and-down"
  >
    <Navbar />
    <div className="content-wrapper">
      <Outlet />
    </div>
  </div>
)
