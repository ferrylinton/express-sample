const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const indexRouter = require('./routers/index-router');
const todoRouter = require('./routers/todo-router');

const app = express(); // express instance

// helmet helps secure Express apps by setting HTTP response headers
app.use(helmet());

// enable CORS
app.use(cors({ origin: '*' }));

// parses incoming requests with JSON payloads and is based on body-parser 
app.use(express.json());

// parses incoming requests with URL-encoded payloads and is based on a body parser
app.use(express.urlencoded({ extended: true }));

// create a new router object in your application to handle requests
app.use('/', indexRouter);
app.use('/api/todoes', todoRouter);

module.exports = app;