import type { Context, Next } from 'hono';
import { verify } from 'hono/jwt';

export const authMiddleware = async (c: Context, next: Next) => {
    const token = c.req.header('Authorization')?.split(' ')[1];

    if (!token) return c.json({ error: 'Unauthorized' }, 401);

    try {
        const payload = await verify(token, process.env.JWT_SECRET!);
        c.set('user', payload);
        await next();
    } catch {
        return c.json({ error: 'Invalid token' }, 401);
    }
};
