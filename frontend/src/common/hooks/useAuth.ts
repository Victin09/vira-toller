import { useState } from 'react'
import { User } from '../../models/user.model'

export const useAuth = () => {
  const [user, setUser] = useState({})

  const login = (user: User) => {
    document.cookie = `user_data=${JSON.stringify(user)};max-age=3600;`
    setUser(user)
  }

  const isLoggedIn = () => {
    const user = document.cookie.replace(
      /(?:(?:^|.*;\s*)user_data\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    return !!user
  }

  const logout = () => {
    sessionStorage.removeItem('user')
    setUser({})
  }

  return {
    isLoggedIn,
    user,
    login,
    logout
  }
}
