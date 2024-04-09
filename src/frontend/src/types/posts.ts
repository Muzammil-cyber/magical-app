export type PostIdType = string

export interface PostType {
    id: PostIdType;
    title: string;
    createdAt: Date;
    content: string;
    authorId: string;
}

