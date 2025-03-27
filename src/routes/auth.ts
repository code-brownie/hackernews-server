import { Hono } from 'hono';
import { logIn, signUp } from '../controller/auth.js';


export const authRoutes = new Hono();

authRoutes.get('/sign-in', signUp);
authRoutes.get('/log-in', logIn);
