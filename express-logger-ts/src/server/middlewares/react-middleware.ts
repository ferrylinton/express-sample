import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { NODE_ENV } from '../utils/env-constant';
import logger from '../utils/winston';

let indexContent: String;

export const reactMiddleware = (req: Request, res: Response, _next: NextFunction) => {
  try {
    if (req.originalUrl.startsWith("/api/")) {

      const message = `Resource [url=${req.originalUrl}] is not found`;
      return res.status(404).json({ message });

    } else {
      if (!indexContent) {
        indexContent = fs.readFileSync(path.join(__dirname, 'main.html'), "utf8");
      }

      res.send(indexContent);
    }

  } catch (error: any) {
    logger.error(error);
    res.status(500).json({ message: error.message, NODE_ENV });
  }
}