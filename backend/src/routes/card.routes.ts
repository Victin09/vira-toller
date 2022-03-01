import { Router } from 'express';

import { getCardsByBoardId, getCardsByUserId, createCard, updateCard, changeCardList, updateCardsOrder, deleteCard } from '../services/card.service';

const router: Router = Router();

router.get('/:id', getCardsByBoardId);
router.get('/user/:id', getCardsByUserId);
router.post('/', createCard);
router.put('/:id', updateCard);
router.put('/:id/list', changeCardList);
router.put('/order', updateCardsOrder);
router.delete('/:id', deleteCard);

export default router;
