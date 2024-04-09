import { PostReturnType } from "./posts";

export type UserIdType = string

export interface UserReturnType {
    id: UserIdType;
    createdAt: Date;
    username: string;
    posts: PostReturnType[]
} 