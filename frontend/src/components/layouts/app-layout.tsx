import { Outlet } from 'react-router-dom'
import { Navbar } from '../navbar'

export const AppLayout = () => {
  return (
    <div className="grid u-gap-2 h-100p">
      <div className="grid-c-12">
        <Navbar />
      </div>
      <div className="grid-c-12 grid-r-12">
        <Outlet />
      </div>
    </div>
  )
}
