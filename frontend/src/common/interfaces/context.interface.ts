import { SignIn, SignUp } from '../../models/auth.model'
import { User } from '../../models/user.model'

export interface AuthContextProps {
  error: string
  getUser: () => User | void
  signin: (data: SignIn) => void
  signup: (data: SignUp) => void
}
