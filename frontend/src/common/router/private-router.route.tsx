import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// Protected route guard for private routes. Check token in cookie and verify it.
export const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth()
  console.log({ isLoggedIn })
  return isLoggedIn() ? <Outlet /> : <Navigate to="/welcome" />
}
