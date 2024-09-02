import { v4 as uuidv4 } from 'uuid';
import pool from "@/config/database";
import { AksaraLog } from "@/types/aksara-log";
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const find = async (): Promise<RowDataPacket[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM aksara_log');
    return rows;
};

export const findById = async (id: string): Promise<RowDataPacket | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM aksara_log WHERE id = ?', [id]);
    return rows.length === 1 ? rows[0] : null;
};

export const create = async ({ phrase, clientIp, userAgent }: Omit<AksaraLog, "id" | "createdAt">) => {
    const params = [uuidv4(), phrase, clientIp, userAgent, new Date()]
    await pool.query<ResultSetHeader>('INSERT INTO aksara_log (id, phrase, client_ip, user_agent, created_at) VALUES (?, ?, ?, ?, ?)', params);
    return await findById(params[0] as string);
};