import { Elysia } from "elysia";
import { staticPlugin } from '@elysiajs/static'
import { html } from '@elysiajs/html'
import path from "path";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";

import { jwt } from '@elysiajs/jwt'
import router from "./backend/app";


await Bun.build({
  entrypoints: ['src/frontend/src/main.tsx'],
  outdir: 'public/dist',

})

const app = new Elysia()
  .use(jwt({ name: 'jwt', secret: process.env.JWT_SECRET as string }))
  .use(
    swagger({
      documentation: {
        info: {
          title: "Todos API Documentation",
          description: "Elysia BunJS Todos API",
          version: "1.0.0",
        },
        tags: [{ name: "POSTS", description: "POSTS endpoints" }, { name: 'USERS', description: 'USERS endpoints' }, { name: 'AUTH', description: 'AUTH endpoints' }],
      },
      exclude: ['/']
    }),
  )
  .use(staticPlugin({
    assets: path.join(__dirname, "frontend/dist"),
    prefix: '/'

  }))
  // .group("/api/users", (app) => app.use(userRouter))
  .group("", (app) => app.use(router))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
