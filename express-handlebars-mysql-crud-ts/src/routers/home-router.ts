import express, { NextFunction, Request, Response } from 'express';
import * as todoService from '@/services/todo-service';


const homeHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('home');
    } catch (error) {
        next(error);
    }
}


/**
 * Create instance of Express.Router
 */
const router = express.Router();

router.get('/', homeHandler);

export default router;