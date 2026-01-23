# 🎓 Course Selling Backend API

A robust and scalable backend API for a course selling platform, built with **Node.js**, **Express**, and **MongoDB**. This project provides a complete set of features for both users and administrators, including secure authentication, course management, and purchase tracking.

## 🚀 Features

### 🔐 Authentication
- **Admin & User Roles**: Separate authentication flows for administrators and students.
- **JWT-based Security**: Secure access to protected routes using JSON Web Tokens.
- **Password Hashing**: (Recommended) Secure storage of user credentials.

### 👨‍💼 Admin Functionalities
- **Course Management**: Create, update, and delete courses.
- **Content Control**: Manage course details, pricing, and availability.
- **Admin Dashboard**: Overview of platform activity.

### 👤 User Functionalities
- **Course Browsing**: View all available courses.
- **Secure Purchase**: Purchase courses and track ownership.
- **My Courses**: Access a personalized list of purchased content.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Security**: JSON Web Tokens (JWT)
- **Environment**: Dotenv for configuration

## 📂 Project Structure

```text
├── middleware/        # Authentication & validation middlewares
├── routes/            # Express route definitions (Admin & User)
├── models/            # Mongoose schemas (User, Admin, Course, Purchase)
├── .env               # Environment variables (Database URL, JWT Secret)
├── index.js           # Main entry point
└── package.json       # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (Local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yuvrajnode/course-selling-backend.git
   cd course-selling-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URL=your_mongodb_connection_string
   JWT_ADMIN_PASSWORD=your_admin_secret
   JWT_USER_PASSWORD=your_user_secret
   ```

4. **Run the server**
   ```bash
   node index.js
   ```

## 🛣️ API Endpoints

### Admin Routes
- `POST /admin/signup` - Register a new admin
- `POST /admin/login` - Admin login
- `POST /admin/course` - Create a new course
- `PUT /admin/course` - Update an existing course
- `GET /admin/course/bulk` - Get all courses created by admin

### User Routes
- `POST /user/signup` - Register a new user
- `POST /user/login` - User login
- `GET /user/course/bulk` - View all available courses
- `POST /user/purchase` - Purchase a course
- `GET /user/purchases` - View purchased courses

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.
