import { Router } from 'express';

import { findWorkspacesByUserId } from '../services/workspace.service';

const router: Router = Router();

// API
router.get('/:id', findWorkspacesByUserId);

export default router;
