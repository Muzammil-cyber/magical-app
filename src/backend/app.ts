import Elysia, { t } from "elysia";
import { login, logout, register } from "./handlers/auth";
import { getUser, getUsers } from "./handlers/users";
import verifyToken from "./lib/verifyToken";

const UserBodyType = t.Object({
    username: t.String({
        minLength: 3
    }),
    password: t.String({
        minLength: 8
    })
})

const router = new Elysia({ prefix: '/api' })
    .guard({
        cookie: t.Optional(t.Object({
            auth: t.Optional(t.String())
        }))
    })
    .post("/login", async ({ body, cookie: { auth } }) => login(body, auth), { body: UserBodyType })
    .post("/register", async ({ body, cookie: { auth } }) => register(body, auth), { body: UserBodyType })
    // POSTS ROUTE
    .get("/users", async () => getUsers())
    .get("/users/:id", async ({ params }) => getUser(params.id))
    // AUTHORIZTED USERS ONLY
    .guard({
        beforeHandle({ cookie: { auth } }) {
            if (!verifyToken(auth)) {
                return { status: 401, message: 'Unauthorized' }
            }
        },
    })
    .post("logout", ({ cookie: { auth } }) => logout(auth))
    .get('/', async () => ({ message: 'Hello World' }));

export default router;