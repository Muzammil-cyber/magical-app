import { Cookie } from "elysia";
import jwt from 'jsonwebtoken';


export default function verifyToken(token: Cookie<string | undefined>): boolean {
    const { value } = token;
    if (!value) return false;
    try {
        jwt.verify(value, process.env.JWT_SECRET as string);
        return true;
    } catch (error) {
        return false;
    }
}