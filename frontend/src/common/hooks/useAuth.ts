import { useEffect, useState } from 'react'
import { User } from '../../models/user.model'

export const useAuth = () => {
  const [user, setUser] = useState<User>({} as User)

  // useEffect(() => {
  //   const user = document.cookie.replace(
  //     /(?:(?:^|.*;\s*)user_data\s*=\s*([^;]*).*$)|^.*$/,
  //     '$1'
  //   )
  //   if (user) {
  //     setUser(JSON.parse(user))
  //   }
  // }, [])

  const login = (user: User) => {
    document.cookie = `user_data=${JSON.stringify(user)};max-age=3600;`
    setUser(user)
  }

  const isLoggedIn = () => {
    const userCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)user_data\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    console.log('userCookie', userCookie)
    return !!userCookie
  }

  const logout = () => {
    sessionStorage.removeItem('user')
    setUser({} as User)
  }

  return {
    isLoggedIn,
    user,
    login,
    logout
  }
}
