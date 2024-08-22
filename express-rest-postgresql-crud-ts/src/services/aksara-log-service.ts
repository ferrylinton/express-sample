import { v4 as uuidv4 } from 'uuid';
import pool from "@/config/database";
import { AksaraLog } from "@/types/aksara-log";

export const find = async (): Promise<Array<AksaraLog>> => {
    const result = await pool.query<AksaraLog>('SELECT * FROM aksara_log');
    return result.rows;
};

export const findById = async (id: string): Promise<AksaraLog | null> => {
    const result = await pool.query('SELECT * FROM aksara_log WHERE id = $1', [id]);
    return result.rows.length === 1 ? result.rows[0] : null;
};

export const create = async (input: Omit<AksaraLog, "id" | "createdAt">) => {
    const { phrase, clientIp, userAgent } = input;
    const id = uuidv4();
    const createdAt = new Date();

    const result = await pool.query('INSERT INTO aksara_log (id, phrase, client_ip, user_agent, created_at) VALUES ($1, $2, $3, $4, $5)', [id, phrase, clientIp, userAgent, createdAt]);
    return result
};