import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getClientIp } from '../utils/ip-util';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // const clientIp = getClientIp(req) + "xx";
    // const token = req.header('Authorization')?.replace('Bearer ', '');

    // if (!token) {
    //     console.log("No token provided");
    //     return res.status(401).json({ message: 'No token provided' });
    // }

    // jwt.verify(token, clientIp, (err) => {
    //     if (err) {
    //         console.log('Invalid token');
    //         return res.status(401).json({ message: 'Invalid token' });
    //     }else{
    //         console.log("valid token");
    //     }

    //     //next();
    // });


    next();
};