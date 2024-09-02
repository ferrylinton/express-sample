import express, { NextFunction, Request, Response } from 'express';
import * as aksaraLogService from '@/services/aksara-log-service'

/**
 * A router that handles AksaraLog REST API
 * @author ferrylinton
 * @module AksaraLogRouter
 */

/**
 * Handler for Endpoint GET /api/aksaralogs
 * @param req {Object} The request.
 * @param req.query.name {String} The name query.
 * @param res {Object} The response.
 * @param {Function} next
 */
const getAksaraLogsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const aksaraLogs = await aksaraLogService.find()
        res.status(200).json(aksaraLogs);
    } catch (error) {
        next(error);
    }
}

/**
 * Handler for Endpoint POST /api/aksaralogs
 * @param req {Object} The request.
 * @param req.body.task {String} The task.
 * @param res {Object} The response.
 * @param {Function} next
 */
const postAksaraLogHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const aksaraLog = await aksaraLogService.create(req.body);
        res.status(201).json(aksaraLog);
    } catch (error) {
        next(error);
    }
}

/**
 * Handler for Endpoint GET /api/aksaralogs/:_id
 * @param req {Object} The request.
 * @param req.params._id {String} AksaraLog Id.
 * @param res {Object} The response.
 * @param {Function} next
 */
const getAksaraLogByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        console.log(req.params.id);
        const aksaraLog = await aksaraLogService.findById(req.params.id);
        if (aksaraLog) {
            res.status(200).json(aksaraLog);
        } else {
            res.status(404).json({ message: "Data is not found" });
        }
    } catch (error) {
        next(error);
    }
}


/**
 * Create instance of Express.Router
 */
const router = express.Router();

router.get('/api/aksaralogs', getAksaraLogsHandler);
router.post('/api/aksaralogs', postAksaraLogHandler);
router.get("/api/aksaralogs/:id", getAksaraLogByIdHandler);

export default router;