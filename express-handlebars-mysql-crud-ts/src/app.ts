import path from 'path';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { create } from 'express-handlebars';
import helmet from 'helmet';
import todoRouter from '@/routers/todo-router';
import aksaraLogRouter from '@/routers/aksara-log-router';
import homeRouter from '@/routers/home-router';

const hbs = create({
    layoutsDir: path.join(process.cwd(), 'src', 'views', 'layouts'),
    partialsDir: path.join(process.cwd(), 'src', 'views', 'partials'),
    defaultLayout: 'main',
    extname: '.hbs'
});

/**
 * Creates an Express application
 */
const app = express();

// hbs config
app.engine('.hbs', hbs.engine);
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'hbs');

// helmet helps secure Express apps by setting HTTP response headers
app.use(helmet());

// enable CORS
app.use(cors({ origin: '*' }));

// parses incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// map router to express application
app.use('/', homeRouter);
app.use('/', todoRouter);
app.use('/', aksaraLogRouter);

// 404 / not found handler
app.use((_req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Not Found" })
})

// error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500);
    return res.json({ message: err.message || 'Internal Server Error' })
})

export default app;