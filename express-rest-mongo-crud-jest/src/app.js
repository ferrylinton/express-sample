const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const indexRouter = require('./routers/index-router');
const todoRouter = require('./routers/todo-router');

// express instance
const app = express(); 

// helmet helps secure Express apps by setting HTTP response headers
app.use(helmet());

// enable CORS
app.use(cors({ origin: '*' }));

// parses incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers that handle requests
app.use('/', indexRouter);
app.use('/api/todoes', todoRouter);

// 404 / Not Found handler
app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" })
})

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: err.message })
})

module.exports = app;