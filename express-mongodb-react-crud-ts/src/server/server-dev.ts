import app from "@src/server/app";
import express from "express";
import jwt from 'jsonwebtoken';
import ViteExpress from "vite-express";
import { JWT_EXPIRES_IN, JWT_SECRET, PORT } from './utils/env-constant';
import { getClientIp } from './utils/ip-util';

function transformer(html: string, req: express.Request) {
  const ip = getClientIp(req);
  const token = jwt.sign({ ip }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  console.log(html);
  return html.replace("###TOKEN###", token)
}

ViteExpress.config({ transformer });


ViteExpress.listen(app, parseInt(PORT), () => {
  ViteExpress.getViteConfig().then(config => {
    //console.log(JSON.stringify(config.build, null, 2));
    //console.log(JSON.stringify(config.server, null, 2))
  })
    .catch(error => {
      console.error(error);
    })
  console.log(`Server is listening on port ${PORT}...`);
});
