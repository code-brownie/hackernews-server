import { prisma } from '../config.js';
import type { Context } from 'hono';

export const getAllPosts = async (c: Context) => {
  const { page = '1', limit = '10' } = c.req.query();
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    skip: (pageNum - 1) * limitNum,
    take: limitNum,
    include: { author: { select: { id: true, name: true } } },
  });

  return c.json(posts);
};

export const getMyPosts = async (c: Context) => {
  const user = c.get('user');
  const { page = '1', limit = '10' } = c.req.query();
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  const posts = await prisma.post.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: 'desc' },
    skip: (pageNum - 1) * limitNum,
    take: limitNum,
  });

  return c.json(posts);
};

export const createPost = async (c: Context) => {
  const user = c.get('user');
  const { title, content } = await c.req.json();

  const post = await prisma.post.create({
    data: { title, content, authorId: user.id },
  });

  return c.json(post);
};

export const deletePost = async (c: Context) => {
  const user = c.get('user');
  const postId = c.req.param('postId');

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) return c.json({ error: 'Post not found' }, 404);
  if (post.authorId !== user.id) return c.json({ error: 'Unauthorized' }, 403);

  await prisma.post.delete({ where: { id: postId } });

  return c.json({ message: 'Post deleted successfully' });
};
