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
export const APP_NAME = process.env.APP_NAME || 'TODO';
export const COOKIE_LOCALE = process.env.COOKIE_LOCALE || 'lang';
export const COOKIE_THEME = process.env.COOKIE_THEME || 'theme';
export const COOKIE_SECRET = process.env.COOKIE_SECRET || 'ferrylinton';
export const LOCALES = process.env.LOCALES?.split(",") || ["en", "id"];
export const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || "en";

export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DB = process.env.DB_DB;
export const DB_PORT: number = parseInt(process.env.DB_PORT || '3306');