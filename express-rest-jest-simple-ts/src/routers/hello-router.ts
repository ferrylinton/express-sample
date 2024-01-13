import express, { NextFunction, Request, Response } from 'express';
import { getMessage } from '../services/hello-service';

/**
 * A router that handles hello REST API
 * @author ferrylinton
 * @module HelloRouter
 */

/**
 * Handler for Endpoint GET /api/hello?name=xxx
 * @param req {Object} The request.
 * @param req.query.name {String} The name query.
 * @param res {Object} The response.
 * @param {Function} next
 */
const getMessageHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = getMessage(req.query.name as string)
        res.status(200).json({message});
    } catch (error) {
        next(error);
    }
}

/**
 * Create instance of Express.Router
 */
const router = express.Router();

/**
 * Map Endpoint GET /api/hello?name=xxx to getMessageHandler
 */
router.get('/api/hello', getMessageHandler);

export default router;