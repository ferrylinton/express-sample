import { Pool } from "pg";
import * as env from "@/config/env-constant";

const pool = new Pool({
  host: env.POSTGRES_HOST,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  port: env.POSTGRES_PORT,
  idleTimeoutMillis: 30000,
});

let schema = 'dev';

pool.on('connect', (client) => {
    client.query(`SET search_path TO ${schema}`);
});

export default pool;