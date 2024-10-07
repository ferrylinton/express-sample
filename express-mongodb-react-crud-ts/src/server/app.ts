import todoRouter from '@src/server/routers/todo-router';
import express from "express";
import favicon from 'express-favicon';
import fs from 'fs';
import path from 'path';
import { authMiddleware } from './middlewares/auth-minddleware';
import { restErrorHandler } from './middlewares/rest-middleware';

let indexContent: String;
const app = express();

app.set('trust proxy', 1);
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// parses incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, 'assets')));

app.use("/api", authMiddleware);

app.get("/api/ping", (_, res) => {
  res.status(200).json({ message: "OK" });
});

// map router to express application
app.use('/api', todoRouter);
app.use('/api', restErrorHandler);

const isProduction = process.env.NODE_ENV === "production";
console.log("process.env.NODE_ENV : ", process.env.NODE_ENV);

if (isProduction) {
  app.get('*', (req, res) => {

    if (!indexContent) {
      indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), "utf8");
    }

    res.send(indexContent);
  });
}

export default app;