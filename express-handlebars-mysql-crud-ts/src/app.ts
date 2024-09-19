import path from 'path';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import favicon from 'express-favicon';
import { create } from 'express-handlebars';
import helmet from 'helmet';
import i18n from 'i18n';
import cookieParser from 'cookie-parser';
import homeRouter from '@src/routers/home-router';
import { helpers } from '@src/config/handlebars-helpers';
import { COOKIE_LOCALE, COOKIE_THEME, DEFAULT_LOCALE, LOCALES } from '@src/config/env-constant';

const VIEWS_FOLDER = path.join(__dirname, 'views');

i18n.configure({
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    directory: path.join(__dirname, 'locales'),
    header: 'x-accept-language',
    cookie: COOKIE_LOCALE,
    queryParameter: 'lang',
});

const handlebars = create({
    layoutsDir: path.join(VIEWS_FOLDER, 'layouts'),
    partialsDir: path.join(VIEWS_FOLDER, 'partials'),
    helpers,
    defaultLayout: 'main',
    extname: 'html'
});

/**
 * Creates an Express application
 */
const app = express();

app.set('trust proxy', 1);
app.use(cookieParser('secret'))
app.use(i18n.init);
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

app.use((req, res, next) => {

    if(req.query.theme){
        let theme = req.query.theme === "dark" ? "dark" : "light";
        res.cookie(COOKIE_THEME, theme, { signed: true, secure: true, maxAge: 900000, httpOnly: true });
        res.locals.theme = theme;
    }else if(req.signedCookies[COOKIE_THEME]){
        res.locals.theme = req.signedCookies[COOKIE_THEME] === "dark" ? "dark" : "light";
    }else{
        let theme = "light";
        res.cookie(COOKIE_THEME, theme, { signed: true, secure: true, maxAge: 900000, httpOnly: true });
        res.locals.theme = theme;
    }

    if(req.query.lang && LOCALES.includes(req.query.lang as string)){
        res.cookie(COOKIE_LOCALE, req.query.lang, { maxAge: 900000, httpOnly: true })
    } else if(!req.cookies[COOKIE_LOCALE]){
        res.cookie(COOKIE_LOCALE, DEFAULT_LOCALE, { maxAge: 900000, httpOnly: true })
    }

    next()
})

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