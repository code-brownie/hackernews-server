import { Hono } from 'hono';
import { getAllPosts, getMyPosts, createPost, deletePost } from '../controller/post.js';
import { authMiddleware } from '../middleware/auth.js'

export const postRoutes = new Hono();

postRoutes.get('/', getAllPosts);
postRoutes.get('/me', authMiddleware, getMyPosts);
postRoutes.post('/', authMiddleware, createPost);
postRoutes.delete('/:postId', authMiddleware, deletePost);
