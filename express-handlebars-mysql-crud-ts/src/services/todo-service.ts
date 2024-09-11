import { v4 as uuidv4 } from 'uuid';
import pool from '@src/config/database';
import { Todo, UpdateTodo } from '@src/types/todo-type';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

/**
 * A service that handles CRUD operations of Todo's data
 * @author ferrylinton
 * @module TodoService
 */

/** @typedef {import("mongodb").InsertOneResult} InsertOneResult */
/** @typedef {import("mongodb").UpdateResult} UpdateResult */
/** @typedef {import("mongodb").DeleteResult} DeleteResult */

/**
 * @typedef {Object} Todo
 * @property {string} _id - The Id
 * @property {string} task - The task
 * @property {boolean} done - The status of the task
 * @property {date} createdAt - Created date
 * @property {date|null} updatedAt - Updated date
 */


/**
 * Find multiple Todo's data
 *
 * @returns Array of {@link Todo} data.
 *
 */
export const find = async () => {
	const [todoes] = await pool.query<RowDataPacket[]>('SELECT * FROM todo');
    return todoes;
};

/**
 * Find a Todo data by ID
 *
 * @param {string} id - The ID of todo data
 * @returns A {@link Todo} data
 */
export const findById = async (id: string) => {
	const [todoes] = await pool.query<RowDataPacket[]>('SELECT * FROM todo WHERE id = ?', [id]);
    return todoes.length === 1 ? todoes[0] : null;
};

/**
 * Create a new Todo document.
 *
 * @param {string} task - The task
 * @returns Object of {@link InsertOneResult}
 */
export const create = async (task: string) => {
	const params = [uuidv4(), task, new Date()]
	await pool.query<ResultSetHeader>('INSERT INTO todo (id, task, created_at) VALUES (?, ?, ?)', params);
	return await findById(params[0] as string);
};

/**
 * Update a todo document in a collection
 *
 * @param {string} _id - The ID of todo document
 * @param {Object} updateData - The new data
 * @param {string} updateData.task - The new task
 * @param {boolean} updateData.done - The task status
 * @returns Object of {@link UpdateResult}.
 */
export const update = async (id: string, { task, done }: UpdateTodo) => {
	const params = [task, done, new Date(), id]
	await pool.query<ResultSetHeader>("UPDATE todo SET task = ?, done = ?, updated_at = ? WHERE id = ?", params);
	return await findById(params[0] as string);
};

/**
 * Delete a todo document from a collection.
 *
 * @param {string} _id - The ID of todo document
 * @returns Object of {@link DeleteResult}.
 */
export const deleteById = async (id: string) => {
	return await pool.query("DELETE FROM todo WHERE id = ?", [id]);
};
