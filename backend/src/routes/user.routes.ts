import { Router } from 'express';

import { listUsers } from '../services/user.service';

// Router
const router: Router = Router();

// API
router.get('/', listUsers);
// router.get('/:id', signin);
// router.put('/:id', forgotPassword);
// router.delete('/:id', resetPassword);

export default router;
