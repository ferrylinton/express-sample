import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_HOST) {
    throw new Error('Invalid environment variable: "DB_HOST"')
}

if (!process.env.DB_USER) {
    throw new Error('Invalid environment variable: "DB_USER"')
}

if (!process.env.DB_PASSWORD) {
    throw new Error('Invalid environment variable: "DB_PASSWORD"')
}

if (!process.env.DB_DB) {
    throw new Error('Invalid environment variable: "DB_DB"')
}

if (!process.env.DB_PORT) {
    throw new Error('Invalid environment variable: "DB_PORT"')
}


export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || '5001';

export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DB = process.env.DB_DB;
export const DB_PORT = parseInt(process.env.DB_PORT || '5432');