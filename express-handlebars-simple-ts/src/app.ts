import path from 'path';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import favicon from 'express-favicon';
import { create } from 'express-handlebars';
import helmet from 'helmet';
import homeRouter from '@src/routers/home-router';

const VIEWS_FOLDER = path.join(__dirname, 'views');

const handlebars = create({
    layoutsDir: path.join(VIEWS_FOLDER, 'layouts'),
    partialsDir: path.join(VIEWS_FOLDER, 'partials'),
    defaultLayout: 'main',
    extname: 'html'
});

/**
 * Creates an Express application
 */
const app = express();

app.set('trust proxy', 1);
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// set assets url
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// hbs config
app.engine('html', handlebars.engine);
app.set('view engine', 'html');
app.set('views', VIEWS_FOLDER);


// helmet helps secure Express apps by setting HTTP response headers
app.use(helmet({ contentSecurityPolicy: false, }));

// enable CORS
app.use(cors({ origin: '*' }));

// parses incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// map router to express application
app.use('/', homeRouter);

// 404 / not found handler
app.use((_req: Request, res: Response, _next: NextFunction) => {
    res.status(404).json({ message: "Not Found" })
})

// error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500);
    return res.json({ message: err.message || 'Internal Server Error' })
})

export default app;