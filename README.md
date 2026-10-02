# Node.js + MySQL Authentication & User Management API

A clean and simple backend authentication and user management system built with **Node.js**, **Express**, **MySQL** (via **Sequelize** ORM), and **Swagger UI** for interactive API testing.

---

## 🚀 Features

- **User Registration** (`POST /api/auth/register`): Validates input, hashes passwords using `bcryptjs`, saves user to MySQL, and returns a JWT token.
- **User Login** (`POST /api/auth/login`): Verifies credentials and generates a JWT token.
- **Update User** (`PUT /api/users/:id`): Updates username, email, or password (protected by JWT).
- **Delete User** (`DELETE /api/users/:id`): Removes user from database (protected by JWT).
- **User Profile & List** (`GET /api/users/profile`, `GET /api/users`): Protected endpoints to inspect user data.
- **Swagger Documentation & Testing** (`/api-docs`): Interactive Swagger UI equipped with JWT **Authorize** support.
- **Automatic Database Setup**: Automatically runs `CREATE DATABASE IF NOT EXISTS auth_db` and syncs MySQL tables on startup.

---

## 📁 Project Structure

```
├── .env                  # Environment variables
├── .env.example          # Sample environment variables
├── .gitignore
├── package.json
├── README.md
└── src/
    ├── app.js            # Express application configuration & middlewares
    ├── server.js         # Server startup & DB connection
    ├── config/
    │   ├── db.js         # MySQL & Sequelize connection handler
    │   └── swagger.js    # Swagger OpenAPI definition & options
    ├── controllers/
    │   ├── authController.js  # Register & Login logic
    │   └── userController.js  # Profile, List, Update, & Delete logic
    ├── middlewares/
    │   └── authMiddleware.js  # JWT Bearer token authentication
    ├── models/
    │   └── User.js       # Sequelize User model with bcrypt hooks
    └── routes/
        ├── authRoutes.js # Auth endpoints + Swagger annotations
        └── userRoutes.js # User endpoints + Swagger annotations
```

---

## ⚙️ Prerequisites

1. **Node.js** (v18+)
2. **MySQL Server** running locally (e.g., via [XAMPP](https://www.apachefriends.org/), [WAMP](https://www.wampserver.com/), [Laragon](https://laragon.org/), Docker, or standard MySQL installation).

---

## 🛠️ Installation & Setup

1. **Clone or open the project folder**:
   ```bash
   cd "f:\Projects\Node JS Projects"
   ```

2. **Install dependencies** (already installed in workspace):
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Check the `.env` file in the root directory:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=auth_db
   JWT_SECRET=supersecretjwtkey_change_in_production_12345
   JWT_EXPIRES_IN=24h
   ```
   > 💡 *Note: If you are using XAMPP/WAMP, `DB_USER` is typically `root` and `DB_PASSWORD` is empty (`""`). If your MySQL server has a root password, set it in `DB_PASSWORD`.*

4. **Start your MySQL server**:
   - Make sure your MySQL service is started (e.g., click **Start** next to MySQL in the XAMPP Control Panel).

5. **Run the server**:
   - For development (with auto-reload):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

---

## 🧪 Testing with Swagger UI

1. Open your browser and navigate to:
   ```
   http://localhost:5000/api-docs
   ```

2. **Step 1: Register a new user**
   - Click **`POST /api/auth/register`**
   - Click **Try it out**
   - Enter your details:
     ```json
     {
       "name": "Alex Smith",
       "email": "alex@example.com",
       "password": "mypassword123"
     }
     ```
   - Click **Execute**
   - Copy the `token` string from the JSON response.

3. **Step 2: Authorize in Swagger**
   - Scroll up and click the green **Authorize 🔓** button at the top right of the Swagger UI.
   - Paste the token into the **Value** field.
   - Click **Authorize**, then click **Close**. The lock icon will now appear locked 🔒.

4. **Step 3: Update User**
   - Click **`PUT /api/users/{id}`**
   - Click **Try it out**
   - Provide the user `id` (e.g., `1`) in the path parameter.
   - Provide the fields you want to update (e.g. new name or password):
     ```json
     {
       "name": "Alex Updated",
       "password": "newpassword123"
     }
     ```
   - Click **Execute** to see the updated user response.

5. **Step 4: Delete User**
   - Click **`DELETE /api/users/{id}`**
   - Click **Try it out**
   - Enter the user `id` (e.g., `1`).
   - Click **Execute** to remove the user.

---

## 📋 API Summary

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ No |
| `POST` | `/api/auth/login` | Log in and receive JWT token | ❌ No |
| `GET` | `/api/users/profile` | Get current logged-in user profile | ✅ Yes (Bearer JWT) |
| `GET` | `/api/users` | Get list of all users | ✅ Yes (Bearer JWT) |
| `PUT` | `/api/users/:id` | Update user by ID | ✅ Yes (Bearer JWT) |
| `DELETE` | `/api/users/:id` | Delete user by ID | ✅ Yes (Bearer JWT) |
