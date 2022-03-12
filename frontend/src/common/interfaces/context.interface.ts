import { SignIn, SignUp } from '../../models/auth.model'
import { User } from '../../models/user.model'

export interface AuthContextProps {
  user: User | null
  loading: boolean
  error: string
  signin: (data: SignIn) => void
  signup: (data: SignUp) => void
}
