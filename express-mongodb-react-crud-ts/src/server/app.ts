import todoRouter from '@src/server/routers/todo-router';
import reactRouter from '@src/server/routers/react-router';
import express from "express";
import favicon from 'express-favicon';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { authMiddleware } from './middlewares/auth-minddleware';
import { rateLimitMiddleware } from './middlewares/rate-limit-minddleware';
import { restErrorHandler } from './middlewares/rest-middleware';
import { JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV } from './utils/env-constant';
import { getClientIp } from './utils/ip-util';
import logger from './utils/winston';

let indexContent: String;
const app = express();

app.set('trust proxy', 1);
app.use(favicon(path.join(__dirname, 'favicon.ico')));

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
app.use('/api', restErrorHandler);

if (NODE_ENV === "production") {
  app.use(reactRouter);
}

export default app;