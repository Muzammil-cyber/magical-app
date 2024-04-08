import { UserBodyType } from "../types/users";
import db from "../db";
import bcrypt from "bcryptjs";
import generateToken from "../lib/genrateToken";
import { Cookie } from "elysia";


export async function login(body: UserBodyType, auth: Cookie<string | undefined>) {
    const { username, password } = body;
    const user = await db.user.findFirst({ where: { username } });
    if (!user) {
        return { status: 404, body: { message: "User not found" } };
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return { status: 401, body: { message: "Invalid password" } };
    }
    const userID = user.id;
    const token = await generateToken(userID);
    auth.value = token; // update the header with new token

    return { status: 200, body: { token, user } };
}

export async function register(body: UserBodyType, auth: Cookie<string | undefined>) {
    const { username, password } = body;
    const user = await db.user.findFirst({ where: { username } });
    if (user) {
        return { status: 409, body: { message: "User already exists" } };
    }
    const genSalt = bcrypt.genSaltSync(8);
    const hashedPassword = bcrypt.hashSync(password, genSalt);
    const newUser = await db.user.create({
        data: {
            username,
            password: hashedPassword
        }
    });
    const userID = newUser.id;
    const token = await generateToken(userID);
    auth.value = token; // update the header with new token
    return { status: 201, body: { token, user: newUser } };
}

export async function logout(auth: Cookie<string | undefined>) {
    if (!auth) {
        return { status: 401, body: { message: "Not logged in" } };
    }
    auth.remove() // update the header with new token
    return { status: 200, body: { message: "Logged out" } };
}