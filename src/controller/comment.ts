import type { Context } from 'hono';
import { prisma } from '../config.js';



export const getCommentsOnPost = async (c: Context) => {
    const { postId } = c.req.param();
    const { page = '1', limit = '10' } = c.req.query();
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    const comments = await prisma.comment.findMany({
        where: { postId },
        orderBy: { createdAt: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
        include: { user: { select: { id: true, name: true } } },
    });
    const totalCommentsOnPost = await prisma.comment.count({
        where: { postId }
    });
    return c.json({
        data: comments,
        meta: {
            currentPage: pageNum,
            totalPages: Math.ceil(totalCommentsOnPost / limitNum),
            totalItems: totalCommentsOnPost,
            itemsPerPage: limitNum
        }
    });
};

export const addComment = async (c: Context) => {
    const user = c.get('user');
    const { postId } = c.req.param();
    const { text } = await c.req.json();

    if (!text.trim()) return c.json({ error: 'Comment text cannot be empty' }, 400);

    const comment = await prisma.comment.create({
        data: { text, userId: user.id, postId },
    });

    return c.json(comment);
};

export const deleteComment = async (c: Context) => {
    const user = c.get('user');
    const { commentId } = c.req.param();

    const comment = await prisma.comment.findUnique({ where: { id: commentId } });

    if (!comment) return c.json({ error: 'Comment not found' }, 404);
    if (comment.userId !== user.id) return c.json({ error: 'Unauthorized' }, 403);

    await prisma.comment.delete({ where: { id: commentId } });

    return c.json({ message: 'Comment deleted successfully' });
};

export const updateComment = async (c: Context) => {
    const user = c.get('user');
    const { commentId } = c.req.param();
    const { text } = await c.req.json();

    const comment = await prisma.comment.findUnique({ where: { id: commentId } });

    if (!comment) return c.json({ error: 'Comment not found' }, 404);
    if (comment.userId !== user.id) return c.json({ error: 'Unauthorized' }, 403);

    const updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: { text },
    });

    return c.json(updatedComment);
};
