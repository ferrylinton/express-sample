import { getCollection } from '@src/server/utils/mongodb';
import { Todo } from '@src/types/todo-type';
import { ObjectId, WithId } from 'mongodb';


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
 * @const {string} Name of Todo Collection
 */
const TODO_COLLECTION = 'todoes';

type FindResult = {
	todoes: Array<Omit<Todo, "_id">>,
	total: number
}

export const mapTodo = (todo: Todo | WithId<Todo>): Omit<Todo, "_id"> => {
	const { _id, id, ...rest } = todo;
	return { id: _id?.toHexString(), ...rest }
}

/**
 * Find multiple Todo documents
 *
 * @returns Array of {@link Todo} documetns.
 *
 */
export const find = async (): Promise<FindResult> => {
	const todoCollection = await getCollection<Todo>(TODO_COLLECTION);
	const todoes = await todoCollection.find().sort({ createdAt: -1 }).toArray();
	const total = await todoCollection.countDocuments();
	return {
		todoes: todoes.map(todo => mapTodo(todo)),
		total
	};
};

export const count = async (): Promise<number> => {
	const todoCollection = await getCollection<Todo>(TODO_COLLECTION);
	return await todoCollection.countDocuments();
};

/**
 * Find a Todo document by ID
 *
 * @param {string} _id - The ID of todo document
 * @returns A {@link Todo} document
 */
export const findById = async (_id: string) => {
	const todoCollection = await getCollection<Todo>(TODO_COLLECTION);
	const todo = await todoCollection.findOne({ _id: new ObjectId(_id) });
	return todo ? mapTodo(todo) : null;
};

/**
 * Create a new Todo document.
 *
 * @param {string} task - The task
 * @returns Object of {@link InsertOneResult}
 */
export const create = async (task: string) => {
	const todo: Todo = {
		task,
		done: false,
		createdAt: (new Date()).toUTCString()
	};
	const todoCollection = await getCollection<Todo>(TODO_COLLECTION);
	return await todoCollection.insertOne(todo);
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
export const update = async (_id: string) => {
	const todoCollection = await getCollection<Todo>(TODO_COLLECTION);
	const updatedAt = (new Date()).toUTCString();
	const done = true;
	return await todoCollection.updateOne({ _id: new ObjectId(_id) }, { $set: { done, updatedAt } });
};

/**
 * Delete a todo document from a collection.
 *
 * @param {string} _id - The ID of todo document
 * @returns Object of {@link DeleteResult}.
 */
export const deleteById = async (_id: string) => {
	const todoCollection = await getCollection<Todo>(TODO_COLLECTION);
	return await todoCollection.deleteOne({ _id: new ObjectId(_id) });
};
