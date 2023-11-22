require('dotenv').config()

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || '5001',
    MONGODB_URL: process.env.MONGODB_URL || '',
    MONGODB_AUTH_SOURCE: process.env.MONGODB_AUTH_SOURCE,
    MONGODB_USERNAME: process.env.MONGODB_USERNAME,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    MONGODB_DATABASE: process.env.MONGODB_DATABASE,
}