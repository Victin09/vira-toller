import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../providers/auth.provider'

// Protected route guard for private routes. Check token in cookie and verify it.
export const ProtectedRoute = () => {
  const { getUser } = useAuth()
  console.log('user', getUser())
  return getUser() ? <Outlet /> : <Navigate to="/welcome" />
}
