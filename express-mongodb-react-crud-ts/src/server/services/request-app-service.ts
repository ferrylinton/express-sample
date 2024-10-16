import { getCollection } from '@src/server/utils/mongodb';
import { RequestApp } from '@src/types/request-app';
import { ObjectId, WithId } from 'mongodb';


/**
 * A service that handles CRUD operations of RequestApp's data
 * @author ferrylinton
 * @module RequestAppService
 */

/** @typedef {import("mongodb").InsertOneResult} InsertOneResult */
/** @typedef {import("mongodb").UpdateResult} UpdateResult */
/** @typedef {import("mongodb").DeleteResult} DeleteResult */

/**
 * @typedef {Object} RequestApp
 * @property {string} _id - The Id
 * @property {string} task - The task
 * @property {boolean} done - The status of the task
 * @property {date} createdAt - Created date
 * @property {date|null} updatedAt - Updated date
 */

/**
 * @const {string} Name of RequestApp Collection
 */
const REQUEST_APP_COLLECTION = 'request-app';


export const mapRequestApp = (requestApp: WithId<RequestApp>): RequestApp => {
	const { _id, id, ...rest } = requestApp;
	return { id: _id?.toHexString(), ...rest }
}

/**
 * Find multiple RequestApp documents
 *
 * @returns Array of {@link RequestApp} documetns.
 *
 */
export const find = async (): Promise<RequestApp[]> => {
	const requestAppCollection = await getCollection<RequestApp>(REQUEST_APP_COLLECTION);
	const requestApps = await requestAppCollection.find().sort({ app: 1 }).toArray();
	return requestApps.map(requestApp => mapRequestApp(requestApp))
};


/**
 * Find a RequestApp document by ID
 *
 * @param {string} id - The ID of requestApp document
 * @returns A {@link RequestApp} document
 */
export const findById = async (id: string) => {
	const requestAppCollection = await getCollection<RequestApp>(REQUEST_APP_COLLECTION);
	const requestApp = await requestAppCollection.findOne({ _id: new ObjectId(id) });
	return requestApp ? mapRequestApp(requestApp) : null;
};

/**
 * Create a new RequestApp document.
 *
 * @param {string} task - The task
 * @returns Object of {@link InsertOneResult}
 */
export const create = async (app: string) => {
	const requestAppCollection = await getCollection<Omit<RequestApp, "id">>(REQUEST_APP_COLLECTION);
	const current = await requestAppCollection.findOne({ app });

	if (!current) {
		const requestApp: Omit<RequestApp, "id"> = {
			app,
			createdAt: (new Date()).toISOString()
		};

		return await requestAppCollection.insertOne(requestApp);
	} else {
		return current;
	}

};

/**
 * Update a requestApp document in a collection
 *
 * @param {string} id - The ID of requestApp document
 * @param {Object} updateData - The new data
 * @param {string} updateData.task - The new task
 * @param {boolean} updateData.done - The task status
 * @returns Object of {@link UpdateResult}.
 */
export const update = async (id: string, app: string) => {
	const requestAppCollection = await getCollection<RequestApp>(REQUEST_APP_COLLECTION);
	const updatedAt = (new Date()).toISOString();
	return await requestAppCollection.updateOne({ _id: new ObjectId(id) }, { $set: { app, updatedAt } });
};

/**
 * Delete a requestApp document from a collection.
 *
 * @param {string} id - The ID of requestApp document
 * @returns Object of {@link DeleteResult}.
 */
export const deleteById = async (id: string) => {
	const requestAppCollection = await getCollection<RequestApp>(REQUEST_APP_COLLECTION);
	return await requestAppCollection.deleteOne({ _id: new ObjectId(id) });
};
