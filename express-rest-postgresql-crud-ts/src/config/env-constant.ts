import dotenv from 'dotenv';

dotenv.config();

if (!process.env.POSTGRES_HOST) {
    throw new Error('Invalid environment variable: "POSTGRES_HOST"')
}

if (!process.env.POSTGRES_USER) {
    throw new Error('Invalid environment variable: "POSTGRES_USER"')
}

if (!process.env.POSTGRES_PASSWORD) {
    throw new Error('Invalid environment variable: "POSTGRES_PASSWORD"')
}

if (!process.env.POSTGRES_DB) {
    throw new Error('Invalid environment variable: "POSTGRES_DB"')
}

if (!process.env.POSTGRES_PORT) {
    throw new Error('Invalid environment variable: "POSTGRES_PORT"')
}


export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || '5001';

export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const POSTGRES_PORT: number = parseInt(process.env.POSTGRES_PORT || '5432');