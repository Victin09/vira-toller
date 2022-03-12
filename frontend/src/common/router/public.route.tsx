import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../providers/useAuth'

// Protected route guard for private routes. Check token in cookie and verify it.
export const PublicRoute = () => {
  const { isLoggedIn } = useAuth()
  return !isLoggedIn() ? <Outlet /> : <Navigate to="/" />
}
