import { prisma } from '../config.js';
import type { Context } from 'hono';

export const getCurrentUser = async (c: Context) => {
    const user = c.get('user');
    const foundUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!foundUser) return c.json({ error: 'User not found' }, 404);

    return c.json(foundUser);
};

export const getAllUsers = async (c: Context) => {
    const { page = '1', limit = '10' } = c.req.query();
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const users = await prisma.user.findMany({
        orderBy: { name: 'asc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
        select: { id: true, name: true, email: true, createdAt: true },
    });
    const totalUsers = await prisma.user.count();
    return c.json({
        data: users,
        meta: {
            currentPage: pageNum,
            totalPages: Math.ceil(totalUsers / limitNum),
            totalItems: totalUsers,
            itemsPerPage: limitNum
        }
    });
};
