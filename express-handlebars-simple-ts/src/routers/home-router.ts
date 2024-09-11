import { NODE_ENV } from '@src/config/env-constant';
import express, { NextFunction, Request, Response } from 'express';


const homeHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('home', {
            NODE_ENV,
            message : "Salam perdamaian !!"
        });
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