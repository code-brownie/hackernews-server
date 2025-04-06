import { Hono } from 'hono';
import { userRoutes } from './routes/user.js';
import { postRoutes } from './routes/post.js';
import { likeRoutes } from './routes/like.js';
import { commentRoutes } from './routes/comment.js';
import { authRoutes } from './routes/auth.js';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import * as dotenv from "dotenv";
import { serve } from '@hono/node-server';
dotenv.config();





const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// Routes
app.get('/', (c) => c.text('Hono!'))
app.route('/auth', authRoutes);
app.route('/users', userRoutes);
app.route('/posts', postRoutes);
app.route('/likes', likeRoutes);
app.route('/comments', commentRoutes);

const port = process.env.PORT || 3000;

serve(app);
console.log(`Server running on http://localhost:${port}`);
