import * as requestInfoService from '@src/server/services/request-info-service';
import express, { NextFunction, Request, Response } from 'express';

const getListHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page: number = parseInt(req.query.page as string || "0");
        const result = await requestInfoService.find({ ...req.query, page });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const postHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await requestInfoService.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const router = express.Router();
router.get('/requestinfos', getListHandler);
router.post('/requestinfos', postHandler);

export default router;