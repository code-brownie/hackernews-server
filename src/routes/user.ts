import { Hono } from 'hono';
import { getCurrentUser, getAllUsers } from '../controller/user.js';
import { authMiddleware } from '../middleware/auth.js';

export const userRoutes = new Hono();

userRoutes.get('/me', authMiddleware, getCurrentUser);
userRoutes.get('/', getAllUsers);
