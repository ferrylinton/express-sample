import requestInfoRouter from '@src/server/routers/request-info-router';
import todoRouter from '@src/server/routers/todo-router';
import cookieParser from 'cookie-parser';
import express from "express";
import favicon from 'express-favicon';
import path from 'path';
import { authMiddleware } from './middlewares/auth-middleware';
import { rateLimitMiddleware } from './middlewares/rate-limit-minddleware';
import { reactMiddleware } from './middlewares/react-middleware';
import { restErrorHandler } from './middlewares/rest-middleware';

const app = express();

app.set('trust proxy', 1);
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(cookieParser());

// parses incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, 'assets')));

app.use("/api", rateLimitMiddleware);
app.use("/api", authMiddleware);

app.get("/api/ping", (_, res) => {
  res.status(200).json({ message: "OK" });
});

// map router to express application
app.use('/api', todoRouter);
app.use('/api', requestInfoRouter);
app.use(restErrorHandler);
app.use(reactMiddleware);

export default app;