import { Collection, Document, MongoClient, MongoClientOptions } from 'mongodb';

/**
 * Module that provides mongodb connection
 * @author ferrylinton
 * @module Mongodb
 */

/** @typedef {import("mongodb").MongoClient} MongoClient */
/** @typedef {import("mongodb").MongoClientOptions} MongoClientOptions */
/** @typedef {import("mongodb").Collection} Collection */

export const MONGODB_AUTH_SOURCE = "admin";
export const MONGODB_DATABASE = "admin";
export const MONGODB_HOST = "127.0.0.1";
export const MONGODB_PORT = process.env.NODE_ENV === 'test' ? "27018" : "27017";
export const MONGODB_USERNAME = "admin";
export const MONGODB_PASSWORD = "password";

/**
 * @constant {MongoClientOptions} mongoClientOptions - Query options for the mongo client
 * @see https://www.mongodb.com/docs/manual/reference/connection-string
 */
const mongoClientOptions: MongoClientOptions = {
    authMechanism: "DEFAULT",
    authSource: MONGODB_AUTH_SOURCE,
    monitorCommands: true,
    connectTimeoutMS: 15000,
    socketTimeoutMS: 15000,
    auth: {
        username: MONGODB_USERNAME,
        password: MONGODB_PASSWORD
    }
};


/**
 * @type {Promise<MongoClient>}
 */
let mongoClient: Promise<MongoClient>;

/**
 * Get instance of MongoClient
 * @returns {MongoClient}
 */
const getMongoClientInstance = () => {

    /**
     * @constant {string} mongodbURL
     */
    const mongodbURL = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}`;

    /**
     * @constant {MongoClient} instance - Instance of MongoClient
     */
    const instance = new MongoClient(mongodbURL, mongoClientOptions);

    connectionPoolMonitoring(instance);

    return instance;
}

/**
 * Record connection pool events in application.
 * @param instance {MongoClient} - Instance of MongoClient
 * @see https://www.mongodb.com/docs/drivers/node/current/fundamentals/monitoring/connection-monitoring/
 */
const connectionPoolMonitoring = (instance: MongoClient) => {
    if (process.env.NODE_ENV !== 'test') {
		const eventNames = [
			'connectionPoolCreated',
			'connectionPoolReady',
			'connectionCreated',
			'connectionClosed',
			'commandStarted',
			'commandSucceeded',
			'commandFailed'
		]

		for (let eventName of eventNames) {
			instance.on(eventName, (event) => {
				console.log(`[MONGODB] ${JSON.stringify(event)}`)
			});
		}
	}
}

/**
 * Get Promise of MongoClient from MongoClient instance
 * @returns {Promise<MongoClient>}
 */
export const getMongoClient = async (): Promise<MongoClient> => {
    if (mongoClient === null || mongoClient === undefined) {
        mongoClient = getMongoClientInstance().connect();
        return mongoClient;
    }

    return mongoClient;
};

/**
 * Get a reference to a MongoDB Collection.
 * @param {string} name - The name of the collection
 * @returns {Promise<Collection>}
 */
export const getCollection = async <TSchema extends Document = Document>(name: string): Promise<Collection<TSchema>> => {
    const connection = await getMongoClient();
    const db = connection.db(MONGODB_DATABASE);
    return db.collection<TSchema>(name);
}
