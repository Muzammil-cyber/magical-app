export type PostIdType = string

export interface PostType {
    id: PostIdType;
    title: string;
    createdAt: string;
    content: string;
    authorId: string;
}

