import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignIn, SignUp } from '../../models/auth.model'
import { User } from '../../models/user.model'
import { Response } from '../types/fetch.type'
import { AuthContextProps } from '../interfaces/context.interface'

const defaultState: AuthContextProps = {
  error: '',
  getUser: (): User | void => {},
  signin: async (): Promise<void> => {},
  signup: async (): Promise<void> => {}
}

const AuthContext = createContext<AuthContextProps>(defaultState)

export const AuthProvider = ({ children }: any) => {
  const auth = useProviderAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

const useProviderAuth = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')

  const getUser = (): User | void => {
    if (user) {
      return user
    }
    const userString = localStorage.getItem('user')
    if (userString) {
      const user = JSON.parse(atob(userString))
      return user
    }
    // navigate('/signin')
  }

  const signin = async (data: SignIn): Promise<void> => {
    const result: Response<User> = await (
      await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
        credentials: 'include'
      })
    ).json()
    console.log(result)
    if (result.status === 'success') {
      setUser(result.data!)
      localStorage.setItem('user', btoa(JSON.stringify(result.data!)))
      navigate('/')
    } else {
      setError(
        result.message === 'Invalid credentials'
          ? 'Email or password is incorrect'
          : 'Something went wrong'
      )
    }
  }

  const signup = async (data: SignUp) => {
    const result: Response<User> = await (
      await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          fullname: data.fullname,
          password: data.password
        }),
        credentials: 'include'
      })
    ).json()
    if (result.status === 'success') {
      setUser(result.data!)
      navigate('/')
    } else {
      console.log('result', result)
      setError(
        result.message === 'Email already exists'
          ? 'Email already exists'
          : 'Something went wrong'
      )
    }
  }

  return {
    error,
    getUser,
    signin,
    signup
  }
}

// export const useAuth = () => {
//   const [user, setUser] = useState<User>({} as User)

//   // useEffect(() => {
//   //   const user = document.cookie.replace(
//   //     /(?:(?:^|.*;\s*)user_data\s*=\s*([^;]*).*$)|^.*$/,
//   //     '$1'
//   //   )
//   //   if (user) {
//   //     setUser(JSON.parse(user))
//   //   }
//   // }, [])

//   const login = (user: User) => {
//     document.cookie = `user_data=${JSON.stringify(user)};max-age=3600;`
//     setUser(user)
//   }

//   const isLoggedIn = () => {
//     const userCookie = document.cookie.replace(
//       /(?:(?:^|.*;\s*)user_data\s*=\s*([^;]*).*$)|^.*$/,
//       '$1'
//     )
//     console.log('userCookie', userCookie)
//     return !!userCookie
//   }

//   const logout = () => {
//     sessionStorage.removeItem('user')
//     setUser({} as User)
//   }

//   return {
//     isLoggedIn,
//     user,
//     login,
//     logout
//   }
// }
