import { Cookie } from "elysia";
import jwt from 'jsonwebtoken';


export default function verifyToken(token: Cookie<string | undefined>): string | null {
    const { value } = token;

    if (!value) return null;
    try {
        const res = jwt.verify(value, process.env.JWT_SECRET as string);
        if (typeof res === 'string') {
            return null;
        }
        return res.id;
    } catch (error) {
        return null;
    }
}