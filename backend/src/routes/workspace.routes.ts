import { Router } from 'express';

import { findWorkspacesByUserId, createWorkspace, updateWorkspace, addUserToWorkspace, removeUserFromWorkspace, deleteWorkspace } from '../services/workspace.service';

const router: Router = Router();

// API
router.get('/:id', findWorkspacesByUserId);
router.post('/', createWorkspace);
router.put('/:id', updateWorkspace);
router.put('/:id/user/add', addUserToWorkspace);
router.put('/:id/user/remove', removeUserFromWorkspace);
router.delete('/:id', deleteWorkspace);

export default router;
