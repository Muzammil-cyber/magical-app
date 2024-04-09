import Elysia, { t } from "elysia";
import { login, logout, register } from "./handlers/auth";
import { deleteUser, getUser, getUsers } from "./handlers/users";
import verifyToken from "./lib/verifyToken";
import { deletePost, getPost, getPosts, getPostsByUser } from "./handlers/posts";

const UserBodyType = t.Object({
    username: t.String({
        minLength: 3
    }),
    password: t.String({
        minLength: 8
    })
})

const api = new Elysia()
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
    .get("/posts", async () => getPosts())
    .get("/posts/:id", async ({ params }) => getPost(params.id))
    .get("/posts?authorId=:", async ({ query }) => getPostsByUser(query.authorId), { query: t.Object({ authorId: t.String() }) })
    // AUTHORIZTED USERS ONLY
    .guard({
        beforeHandle({ cookie: { auth } }) {
            const id = verifyToken(auth);
            if (!id) {
                return { status: 401, message: 'Unauthorized' }
            } 
        },
    })
    .post("logout", ({ cookie: { auth } }) => logout(auth))
    .delete("/users/:id", async ({ params, cookie: { auth } }) => deleteUser(params.id, auth))
    .delete(
        "/posts/:id",
        async ({ params, cookie: { auth }, body }) => deletePost(params.id, body.authorId, auth),
        { body: t.Object({ authorId: t.String() }) }
    )
    .get('/', async () => ({ message: 'Hello World' }));

export default api;