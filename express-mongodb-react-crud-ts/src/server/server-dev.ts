import app from "@src/server/app";
import express from "express";
import jwt from 'jsonwebtoken';
import ViteExpress from "vite-express";
import { JWT_EXPIRES_IN, JWT_SECRET } from './utils/env-constant';
import { getClientIp } from './utils/ip-util';

function transformer(html: string, req: express.Request) {
  const ip = getClientIp(req);
  const token = jwt.sign({ ip }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return html.replace("###TOKEN###", token)
}


ViteExpress.config({ transformer })

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
