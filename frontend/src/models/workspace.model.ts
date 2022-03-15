import { User } from './user.model'

export interface WorkspaceForm {
  name: string
  description: string
}

export interface Workspace {
  id: string
  name: string
  description: string
  users: User[]
}
