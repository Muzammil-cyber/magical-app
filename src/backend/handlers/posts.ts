import { Cookie } from "elysia";
import db from "../db";
import verifyToken from "../lib/verifyToken";

export function getPosts() {
    try {
        return db.post.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                authorId: true,
                createdAt: true,
            }
        })
    } catch (error) {
        return { error };
    }

}

export function getPost(id: string) {
    try {
        return db.post.findUnique({
            where: {
                id: id
            },
            select: {
                title: true,
                content: true,
                id: true,
                authorId: true,
                createdAt: true,
            }
        })
    } catch (error) {
        return { error };
    }
}

export function createPost({ title, content, authorId }: { title: string, content: string, authorId: string }) {
    try {
        return db.post.create({
            data: {
                title,
                content,
                authorId
            }
        })
    } catch (error) {
        return { error };
    }
}

export function deletePost(id: string, authorId: string, auth: Cookie<string | undefined>) {
    const resId = verifyToken(auth);
    try {
        if (!resId || resId !== authorId) {
            return { error: 'Unauthorized' }
        }
        return db.post.delete({
            where: {
                id: id,
                authorId: authorId
            }
        })
    } catch (error) {
        return { error };
    }
}

export function updatePost(id: string, authorId: string, { title, content }: { title: string, content: string }, auth: Cookie<string | undefined>) {
    const resId = verifyToken(auth);
    try {
        if (!resId || resId !== authorId) {
            return { error: 'Unauthorized' }
        }
        return db.post.update({
            where: {
                id: id,
                authorId: authorId
            },
            data: {
                title,
                content
            }
        })
    } catch (error) {
        return { error };
    }
}

export function getPostsByUser(authorId: string) {
    try {
        return db.post.findMany({
            where: {
                authorId: authorId
            },
            select: {
                title: true,
                content: true,
                id: true,
                authorId: true,
                createdAt: true,
            }
        })
    } catch (error) {
        return { error };
    }
}

