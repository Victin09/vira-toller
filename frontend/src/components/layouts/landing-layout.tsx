import { Outlet } from 'react-router-dom'

export const LandingLayout = () => {
  return (
    <div className="container h-100">
      <Outlet />
    </div>
  )
}
