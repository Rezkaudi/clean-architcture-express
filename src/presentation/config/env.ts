import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
    NODE_ENV: process.env.NODE_ENV || "development",
    FRONT_URL: process.env.FRONT_URL || "http://localhost:3000",
    SERVER_URL: process.env.SERVER_URL || "http://localhost:8080",
    PORT: process.env.PORT || 8080,

    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,

    DEV_MONGODB_URI: process.env.DEV_MONGODB_URI,
    DEV_POSTGRESQL_URI: process.env.DEV_POSTGRESQL_URI,

    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    POSTGRES_PORT: process.env.POSTGRES_PORT || 5432,

    JWT_SECRET_ACCESS_TOKEN: {
        token: process.env.JWT_SECRET_ACCESS_TOKEN || "",
        age: "1d"
    },

    JWT_SECRET_REFRESH_TOKEN: {
        token: process.env.JWT_SECRET_REFRESH_TOKEN || "",
        age: "7d"
    },

    ACCESS_TOKEN_COOKIE: {
        name: "accessToken",
        age: 1 * 24 * 60 * 60 * 1000,// 1 day
    },

    REFRESH_TOKEN_COOKIE: {
        name: "refreshToken",
        age: 7 * 24 * 60 * 60 * 1000,// 7 day
    },

    SALT_ROUNDS_BCRYPT: 10

};