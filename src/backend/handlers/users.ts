import { UserBodyType } from '../types/users';
import bcrypt from 'bcryptjs';
import db from '../db'


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




export async function deleteUser(id: string) {
    try {
        fetch("auth/logout", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await db.user.delete({
            where: {
                id: id
            }
        })
    } catch (error: unknown) {
        return { error };
    }
}