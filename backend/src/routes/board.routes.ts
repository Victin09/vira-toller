import { Router } from 'express';

import { findBoardById, findBoardsByUserId, findBoardsByWorkspaceId, createBoard, updateBoard, addUserToBoard, removeUserFromBoard, deleteBoard } from '../services/board.service';

const router: Router = Router();

router.get('/:id', findBoardById);
router.get('/user/:id', findBoardsByUserId);
router.get('/workspace/:id', findBoardsByWorkspaceId);
router.post('/', createBoard);
router.put('/:id', updateBoard);
router.put('/:id/user/add', addUserToBoard);
router.put('/:id/user/remove', removeUserFromBoard);
router.delete('/:id', deleteBoard);

export default router;
