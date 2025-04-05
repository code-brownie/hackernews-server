import { Hono } from 'hono';
import { userRoutes } from './routes/user.js';
import { postRoutes } from './routes/post.js';
import { likeRoutes } from './routes/like.js';
import { commentRoutes } from './routes/comment.js';
import { authRoutes } from './routes/auth.js';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import * as dotenv from "dotenv";
dotenv.config();





const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());   

// Routes
app.route('/auth', authRoutes);
app.route('/users', userRoutes);
app.route('/posts', postRoutes);
app.route('/likes', likeRoutes);
app.route('/comments', commentRoutes);

const port = process.env.PORT || 3000;
console.log(`Server running on http://localhost:${port}`);

export default app;
