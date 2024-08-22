import { v4 as uuidv4 } from 'uuid';
import pool from '@/config/database';
import { Todo, UpdateTodo } from '@/types/todo-type';

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
	const result = await pool.query<Todo>('SELECT * FROM todo');
    return result.rows;
};

/**
 * Find a Todo data by ID
 *
 * @param {string} id - The ID of todo data
 * @returns A {@link Todo} data
 */
export const findById = async (id: string) => {
	const result = await pool.query('SELECT * FROM todo WHERE id = $1', [id]);
    return result.rows.length === 1 ? result.rows[0] : null;
};

/**
 * Create a new Todo document.
 *
 * @param {string} task - The task
 * @returns Object of {@link InsertOneResult}
 */
export const create = async (task: string) => {
	const id = uuidv4();
	const createdAt = new Date();
	const result = await pool.query('INSERT INTO todo (id, task, created_at) VALUES ($1, $2, $3)', [id, task, createdAt]);
    return result
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
	return await pool.query("UPDATE todo SET task = $1, done = $2, updated_at = $3 WHERE id = $4", params);
};

/**
 * Delete a todo document from a collection.
 *
 * @param {string} _id - The ID of todo document
 * @returns Object of {@link DeleteResult}.
 */
export const deleteById = async (id: string) => {
	return await pool.query("DELETE FROM todo WHERE id = $1", [id]);
};
