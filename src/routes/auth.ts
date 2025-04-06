import { Hono } from 'hono';
import { logIn, signUp } from '../controller/auth.js';


export const authRoutes = new Hono();

authRoutes.post('/sign-in', signUp);
authRoutes.post('/log-in', logIn);
