import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import helloRouter from './routers/hello-router';
import mongo_express from 'mongo-express/lib/middleware';

/**
 * Configuration of Express Application
 * @author ferrylinton
 * @module App
 */

/**
 * Creates an instance of Express
 */
const app = express();


// map router to instance of express
app.use('/', mongo_express());


export default app;