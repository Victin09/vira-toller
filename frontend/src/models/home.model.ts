import { Board } from './board.model'
import { Workspace } from './workspace.model'

export interface Home {
  workspace: Workspace
  boards: Board[]
}
