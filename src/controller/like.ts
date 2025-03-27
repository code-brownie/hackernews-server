import type { Context } from 'hono';
import { prisma } from '../config.js';


export const getLikesOnPost = async (c: Context) => {
  const { postId } = c.req.param();
  const { page = '1', limit = '10' } = c.req.query();
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  const likes = await prisma.like.findMany({
    where: { postId },
    orderBy: { createdAt: 'desc' },
    skip: (pageNum - 1) * limitNum,
    take: limitNum,
    include: { user: { select: { id: true, name: true } } },
  });

  return c.json(likes);
};

export const likePost = async (c: Context) => {
  const user = c.get('user');
  const { postId } = c.req.param();

  const existingLike = await prisma.like.findUnique({
    where: { userId_postId: { userId: user.id, postId } },
  });

  if (existingLike) return c.json({ message: 'Already liked' });

  const like = await prisma.like.create({
    data: { userId: user.id, postId },
  });

  return c.json(like);
};

export const unlikePost = async (c: Context) => {
  const user = c.get('user');
  const { postId } = c.req.param();

  const like = await prisma.like.findUnique({
    where: { userId_postId: { userId: user.id, postId } },
  });

  if (!like) return c.json({ error: 'Like not found' }, 404);

  await prisma.like.delete({ where: { userId_postId: { userId: user.id, postId } } });

  return c.json({ message: 'Like removed' });
};
