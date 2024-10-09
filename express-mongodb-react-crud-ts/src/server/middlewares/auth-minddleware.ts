import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getClientIp } from '../utils/ip-util';
import { JWT_SECRET } from '../utils/env-constant';
import logger from '../utils/winston';

type TokenData = {
    ip: string
} & JwtPayload

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const requestIp = getClientIp(req);
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        logger.info("No token provided");
        return res.status(401).json({ message: 'No token provided', code: "noTokenProvided" });
    }

    try {
        const { ip : tokenIp } = jwt.verify(token, JWT_SECRET) as TokenData;
        if (tokenIp !== requestIp) {
            logger.info(`Request IP : ${requestIp}, Token IP : ${tokenIp}`);
            logger.info("Token has invalid IP");
            return res.status(401).json({ message: 'Token has invalid IP', code: "invalidIp" });
        }
    } catch (error) {
        logger.error(error);
        return res.status(401).json({ message: 'Invalid token', code: "invalidToken" });
    }

    next();
};