const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const indexRouter = require('./routers/index-router');

/**
 * Creates an Express application
 */
const app = express();

// helmet helps secure Express apps by setting HTTP response headers
app.use(helmet());

// enable CORS
app.use(cors({ origin: '*' }));

// parses incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// map router to express application
app.use('/', indexRouter);

// 404 / not found handler
app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" })
})

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: err.message })
})

module.exports = app;