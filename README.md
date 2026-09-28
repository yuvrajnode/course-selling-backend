# Course Selling Backend

REST API for a course marketplace: admins publish courses, students sign up, browse, and buy them. Built with Node.js, Express 5, MongoDB and JWT, with separate auth for admins and users.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

## Features

- **Two roles, two secrets.** Admin and user tokens are signed with different keys, so a user token can never pass the admin middleware.
- **Password hashing** with bcrypt and **request validation** with Zod.
- **Course management** for admins: create, update, list.
- **Purchases** for users, plus a "my purchases" endpoint.

## Project structure

```text
├── index.js          # App entry: mounts routers under /api/v1, connects to MongoDB
├── config.js         # Reads secrets from the environment
├── db.js             # Mongoose schemas: user, admin, course, purchase
├── middleware/       # adminMiddleware, userMiddleware (Bearer token check)
└── routes/           # admin.js, user.js, course.js
```

## Getting started

**Prerequisites:** Node.js 18+ and a MongoDB database (local or Atlas).

```bash
git clone https://github.com/yuvrajnode/course-selling-backend.git
cd course-selling-backend
npm install
cp .env.example .env   # then fill in your own values
node index.js
```

The server listens on `http://localhost:3000`.

### Environment variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_ADMIN_PASSWORD` | Secret used to sign admin tokens |
| `JWT_USER_PASSWORD` | Secret used to sign user tokens |

## API

All routes are prefixed with `/api/v1`. Protected routes expect `Authorization: Bearer <token>`.

### Admin

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/admin/signup` | – | Register an admin (`email`, `password`, `firstName`, `lastName`) |
| POST | `/admin/signin` | – | Returns an admin JWT |
| POST | `/admin/course` | admin | Create a course (`title`, `description`, `price`, `imageUrl`) |
| PUT | `/admin/course/:id` | admin | Update a course |
| GET | `/admin/course/bulk` | – | List all courses |

### User

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/user/signup` | – | Register a user |
| POST | `/user/signin` | – | Returns a user JWT |
| GET | `/user/purchases` | user | Courses the user has bought |

### Courses

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/course/preview` | – | Public course catalogue |
| POST | `/course/purchase` | user | Buy a course (`courseId`) |

### Example

```bash
curl -X POST http://localhost:3000/api/v1/user/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"secret123"}'
```

## License

[MIT](LICENSE) © Yuvraj Singh
