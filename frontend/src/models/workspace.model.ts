import { Board } from './board.model'
import { User } from './user.model'

export interface WorkspaceHome {
  id: string
  name: string
  boards: Board[]
}

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
