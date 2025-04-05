import { Hono } from 'hono';
import { getLikesOnPost, likePost, unlikePost } from '../controller/like.js';
import { authMiddleware } from '../middleware/auth.js';
// import { authMiddleware } from './auth.js';


export const likeRoutes = new Hono();

likeRoutes.get('/on/:postId', getLikesOnPost);
likeRoutes.post('/on/:postId', authMiddleware, likePost);
likeRoutes.delete('/on/:postId', authMiddleware, unlikePost);
