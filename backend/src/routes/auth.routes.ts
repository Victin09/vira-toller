import { Router } from 'express';
import { signup, signin, forgotPassword, resetPassword } from '../services/auth.service';

// Router
const router: Router = Router();

// API
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

export default router;
