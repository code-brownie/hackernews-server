import { prisma } from '../config.js';
import { sign } from 'hono/jwt';
import { hash, compare } from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET!;

export const signUp = async (c:any) => {
  const { name, email, password } = await c.req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return c.json({ error: 'Email already exists' }, 400);

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const token = await sign({ id: user.id, email: user.email }, JWT_SECRET);

  return c.json({ token, user });
};

export const logIn = async (c:any) => {
  const { email, password } = await c.req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return c.json({ error: 'Invalid credentials' }, 401);

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) return c.json({ error: 'Invalid credentials' }, 401);

  const token = await sign({ id: user.id, email: user.email }, JWT_SECRET);

  return c.json({ token, user });
};
