import { User } from './user.model'

export interface Board {
  name: string
  descriptions: string
  image: string
  users: User[]
}
