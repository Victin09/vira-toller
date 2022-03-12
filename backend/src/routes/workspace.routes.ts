import { Router } from 'express';

import { findWorkspacesByUser, createWorkspace, updateWorkspace, addUserToWorkspace, removeUserFromWorkspace, deleteWorkspace } from '../services/workspace.service';

const router: Router = Router();

// API
router.get('/:email', findWorkspacesByUser);
router.post('/', createWorkspace);
router.put('/:email', updateWorkspace);
router.put('/:email/user/add', addUserToWorkspace);
router.put('/:email/user/remove', removeUserFromWorkspace);
router.delete('/:email', deleteWorkspace);

export default router;
