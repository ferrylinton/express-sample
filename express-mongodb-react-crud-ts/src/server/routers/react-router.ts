import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../utils/env-constant';
import { getClientIp } from '../utils/ip-util';

let indexContent: String;

const reactHandler = async (req: Request, res: Response, next: NextFunction) => {
    const ip = getClientIp(req);
    const token = jwt.sign({ ip }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    if (!indexContent) {
      indexContent = fs.readFileSync(path.join(__dirname, 'main.html'), "utf8");
    }
    
    res.send(indexContent.replace("###TOKEN###", token));
}

const router = express.Router();
router.get('', reactHandler);
router.get('', reactHandler);

export default router;