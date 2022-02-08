import { Router } from 'express';

import { listUsers, findUserById, findUserByEmail, findUserByUsername, updateUserById, deleteUserById } from '../services/user.service';

// Router
const router: Router = Router();

// API
router.get('/', listUsers);
router.get('/:id', findUserById);
router.get('/:email', findUserByEmail);
router.get('/:username', findUserByUsername);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
