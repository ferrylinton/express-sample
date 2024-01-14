const { MongoClient } = require('mongodb');

/**
 * Module that provides mongodb connection
 * @author ferrylinton
 * @module Mongodb
 */

/** @typedef {import("mongodb").MongoClient} MongoClient */
/** @typedef {import("mongodb").MongoClientOptions} MongoClientOptions */
/** @typedef {import("mongodb").Collection} Collection */


const MONGODB_AUTH_SOURCE = "admin";
const MONGODB_DATABASE = "admin";
const MONGODB_HOST = "127.0.0.1";
const MONGODB_PORT = process.env.NODE_ENV === 'test' ? "27018" : "27017";
const MONGODB_USERNAME = "admin";
const MONGODB_PASSWORD = "password";

/**
 * @constant {MongoClientOptions} mongoClientOptions - Query options for the mongo client
 * @see https://www.mongodb.com/docs/manual/reference/connection-string
 */
const mongoClientOptions = {
	authMechanism: 'DEFAULT',
	authSource: MONGODB_AUTH_SOURCE,
	monitorCommands: process.env.NODE_ENV !== 'test',
	auth: {
		username: MONGODB_USERNAME,
		password: MONGODB_PASSWORD,
	},
};

/**
 * @type {Promise<MongoClient>}
 */
let mongoClient;

/**
 * Get instance of MongoClient
 * @returns {MongoClient}
 * @see https://www.mongodb.com/docs/drivers/node/current/quick-start/create-a-connection-string/
 */
const getMongoClientInstance = () => {

	/**
	 * @constant {string} mongodbURL
	 */
	const mongodbURL = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}`;

	/**
	 * @constant {MongoClient} instance
	 */
	const instance = new MongoClient(mongodbURL, mongoClientOptions);

	connectionPoolMonitoring(instance);

	return instance;
};

/**
 * Record connection pool events in application.
 * @param instance {MongoClient} - Instance of MongoClient
 * @see https://www.mongodb.com/docs/drivers/node/current/fundamentals/monitoring/connection-monitoring/
 */
const connectionPoolMonitoring = (instance) => {
	if (process.env.NODE_ENV !== 'test') {
		instance.on('connectionPoolCreated', (event) => console.log(`[MONGODB] ${JSON.stringify(event)}`));
		instance.on('connectionPoolReady', (event) => console.log(`[MONGODB] ${JSON.stringify(event)}`));
		instance.on('connectionCreated', (event) => console.log(`[MONGODB] ${JSON.stringify(event)}`));
		instance.on('connectionClosed', (event) => console.log(`[MONGODB] ${JSON.stringify(event)}`));
		instance.on('commandStarted', started => console.log(started));
	}
}

/**
 * Get Promise of MongoClient from MongoClient instance
 * @returns {Promise<MongoClient>}
 */
exports.getMongoClient = async () => {
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
exports.getCollection = async name => {
	const connection = await this.getMongoClient();
	const db = connection.db(MONGODB_DATABASE);
	return db.collection(name);
};
