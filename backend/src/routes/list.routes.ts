import { Router } from 'express';

import { getListsByBoardId, getListsByUserId, createList, updateList, changeListsOrder, deleteList } from '../services/list.service';

const router: Router = Router();

router.get('/:id', getListsByBoardId);
router.get('/user/:id', getListsByUserId);
router.post('/', createList);
router.put('/:id', updateList);
router.put('/order', changeListsOrder);
router.delete('/:id', deleteList);

export default router;
