import { Router, Request, Response } from 'express';
import passport from 'passport';

import auth from './auth.routes';
import user from './user.routes';
import workspace from './workspace.routes';
import board from './board.routes';
import list from './list.routes';
import card from './card.routes';

// Router
const router: Router = Router();

// API
router.get('/', passport.authenticate('jwt', { session: false }), (_req: Request, res: Response) => {
  return res.status(200).send({
    success: true,
    message: 'Router run correctly',
  });
});

router.use('/auth', auth);
router.use('/users', user);
router.use('/workspaces', workspace);
router.use('/boards', board);
router.use('/lists', list);
router.use('/cards', card);

export default router;
