const { ObjectId } = require('mongodb');
const { getCollection } = require('../configs/mongodb');

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

/**
 * Find multiple Todo documents
 *
 * @returns Array of {@link Todo} documetns.
 *
 */
exports.find = async () => {
	const todoCollection = await getCollection(TODO_COLLECTION);
	return todoCollection.find().toArray();
};

/**
 * Find a Todo document by ID
 *
 * @param {string} _id - The ID of todo document
 * @returns A {@link Todo} document
 */
exports.findById = async _id => {
	const todoCollection = await getCollection(TODO_COLLECTION);
	return await todoCollection.findOne({ _id: new ObjectId(_id) });
};

/**
 * Create a new Todo document.
 *
 * @param {string} task - The task
 * @returns Object of {@link InsertOneResult}
 */
exports.create = async task => {
	const todo = {
		task,
		done: false,
		createdAt: new Date(),
		updatedAt: null,
	};
	const todoCollection = await getCollection(TODO_COLLECTION);
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
exports.update = async (_id, { task, done }) => {
	const todoCollection = await getCollection(TODO_COLLECTION);
	const updatedAt = new Date();
	const todo = { updatedAt };
    
    if(task){
        todo.task = task
    }

    if(done !== null || done !== undefined){
        todo.done = done
    }

	return await todoCollection.updateOne({ _id: new ObjectId(_id) }, { $set: todo });
};

/**
 * Delete a todo document from a collection.
 *
 * @param {string} _id - The ID of todo document
 * @returns Object of {@link DeleteResult}.
 */
exports.deleteById = async _id => {
	const todoCollection = await getCollection(TODO_COLLECTION);
	return await todoCollection.deleteOne({ _id: new ObjectId(_id) });
};
