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
import { swaggerUI } from '@hono/swagger-ui';
import { appDocs } from './docs/swagger.js';
dotenv.config();

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());


const openApiSpec = appDocs.getOpenAPIDocument({
    openapi: '3.1.0',
    info: {
        title: 'HackerNews API',
        version: '1.0.0',
        description: 'API for a social media application'
    }
})



app.get('/docs/openapi.json', (c) => {
    return c.json(openApiSpec)
})


app.get('/docs', swaggerUI({ url: '/docs/openapi.json' }))


app.route('/auth', authRoutes);
app.route('/users', userRoutes);
app.route('/posts', postRoutes);
app.route('/likes', likeRoutes);
app.route('/comments', commentRoutes);

const port = process.env.PORT || 3000;

serve(app);
console.log(`Server running on http://localhost:${port}`);