import { Router, Request, Response } from 'express';
import passport from 'passport';

import auth from './auth.routes';
import user from './user.routes';

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

export default router;
