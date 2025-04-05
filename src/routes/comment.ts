import { Hono } from 'hono';
import { addComment, deleteComment, getCommentsOnPost, updateComment } from '../controller/comment.js';
import { authMiddleware } from '../middleware/auth.js';


export const commentRoutes = new Hono();

commentRoutes.get('/on/:postId', getCommentsOnPost);
commentRoutes.post('/on/:postId', authMiddleware, addComment);
commentRoutes.delete('/:commentId', authMiddleware, deleteComment);
commentRoutes.patch('/:commentId', authMiddleware, updateComment);
