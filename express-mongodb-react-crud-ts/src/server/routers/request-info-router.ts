import * as requestInfoService from '@src/server/services/request-info-service';
import express, { NextFunction, Request, Response } from 'express';

const postRequestInfoHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await requestInfoService.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const router = express.Router();
router.post('/requestinfos', postRequestInfoHandler);

export default router;