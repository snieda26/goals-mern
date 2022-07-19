import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/userController.js';
import protectAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', protectAuth, registerUser);
router.post('/login', protectAuth, loginUser);
router.get('/me', protectAuth, getMe)

export default router;