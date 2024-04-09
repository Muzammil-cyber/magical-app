import { UserBodyType } from '../types/users';
import bcrypt from 'bcryptjs';
import db from '../db'
import verifyToken from '../lib/verifyToken';
import { Cookie } from 'elysia';


export async function getUsers() {
    try {
        return await db.user.findMany({
            select: {
                username: true,
                id: true
            }
        })
    } catch (error: unknown) {
        return { error };
    }

}

export async function getUser(id: string) {
    try {
        return await db.user.findUnique({
            where: {
                id: id
            },
            select: {
                posts: true,
                username: true,
                id: true,
                createdAt: true,
                password: false
            }
        })
    } catch (error: unknown) {
        return { error };
    }
}

export async function deleteUser(id: string, auth: Cookie<string | undefined>) {
    const resId = verifyToken(auth);
    try {
        if (!resId || resId !== id) {
            return { error: 'Unauthorized' }
        }
        fetch("auth/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        await db.post.deleteMany({ where: { authorId: id } }) // Delete all posts of User
        return await db.user.delete({
            where: {
                id: id
            }
        })
    } catch (error: unknown) {
        return { error };
    }
}