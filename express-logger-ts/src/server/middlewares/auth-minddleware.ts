import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET, TOKEN_COOKIE_EXPIRES } from '../utils/env-constant';
import { getClientIp } from '../utils/ip-util';
import logger from '../utils/winston';

type TokenData = {
    ip: string
} & JwtPayload

const setCookieToken = (req: Request, res: Response) => {
    const ip = getClientIp(req);
    const token = jwt.sign({ ip }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const expires = new Date(Date.now() + (TOKEN_COOKIE_EXPIRES * 1000));
    res.cookie('token', token, { expires })
}

const authenticateAPI = (req: Request) => {
    const ip = getClientIp(req);

    if (req.originalUrl.startsWith("/api/")) {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token || token === 'undefined' || token.trim().length === 0) {
            logger.info("No token provided");
            return { message: 'No token provided', code: "noTokenProvided" };
        }

        try {
            const { ip: tokenIp } = jwt.verify(token, JWT_SECRET) as TokenData;
            if (tokenIp !== ip) {
                logger.info(`Request IP : ${ip}, Token IP : ${tokenIp}`);
                logger.info("Token has invalid IP");
                return { message: 'Token has invalid IP', code: "invalidIp" };
            }
        } catch (error) {
            logger.error(error);
            return { message: 'Invalid token', code: "invalidToken" };
        }
    }

    return null;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`originalUrl : ${req.originalUrl}`)

    setCookieToken(req, res);
    const result = authenticateAPI(req);

    if (result !== null) {
        return res.status(401).json(result);
    }

    next();
};