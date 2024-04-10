# Magical Web App

## Upload your Thoughts on The Internet

This web application allows users to share their thoughts and ideas with the world. Users can create an account, log in, and write posts.

### API Documentation

Explore the [API Documentation](http://localhost:3000/swagger) for more details.

### Technologies Used

- Bunjs
- Elysiajs
- Postgres
- Docker
- Reactjs
- Vite
- Tailwindcss
- Typescript
- jwt
- bcrypt
- swagger

### How to Run the Project

1. Clone the repository.
2. Create a `.env` file in the root directory and add the following environment variables:

``` dotenv
DATABASE_URL=postgres://postgres:password@localhost:5432/magical_web_app
JWT_SECRET=your_secret_key
```

3. Run the following commands:

``` bash
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### How to Seed the Database

``` bash
bun prisma db seed
```
