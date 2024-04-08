import jwt from 'jsonwebtoken';

export default async function generateToken(id: string) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d'
    });
    return token;
}