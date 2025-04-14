# 🧼 Clean Architecture with Express.js

A Node.js project built with **Express.js**, structured using the **Clean Architecture** principles to promote maintainability, scalability, and separation of concerns.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Rezkaudi/clean-architcture-express.git
cd clean-architcture-express
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a .env file in the root directory and add your environment-specific variables
like:

```bash
NODE_ENV = "development"
FRONT_URL = "http://localhost:3000"
SERVER_URL = "http://localhost:8080"
PORT = 8080

GMAIL_USER = "???"
GMAIL_PASS = "???"

DEV_MONGODB_URI= "???"
DEV_POSTGRESQL_URI="???"

POSTGRES_USER="???"
POSTGRES_HOST="???"
POSTGRES_PASSWORD="???"
POSTGRES_DATABASE="???"

JWT_SECRET_ACCESS_TOKEN = "???"
JWT_SECRET_REFRESH_TOKEN = "???"

AWS_ACCESS_KEY_ID = "???"
AWS_SECRET_ACCESS_KEY = "???"
AWS_S3_BUCKET_NAME = "???"

STRIPE_SECRET_KEY = "???"
STRIPE_WEBHOOK_SECRET = "???"
```

### 4. Run the Server

```bash
npm run dev
```
