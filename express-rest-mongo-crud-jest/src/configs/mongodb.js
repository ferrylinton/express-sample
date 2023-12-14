const { MongoClient } = require('mongodb');

const MONGODB_AUTH_SOURCE = "admin";
const MONGODB_DATABASE = "admin";
const MONGODB_HOST = "127.0.0.1";
const MONGODB_PORT = process.env.NODE_ENV === 'test' ? "27018" : "27017";
const MONGODB_USERNAME = "admin";
const MONGODB_PASSWORD = "password";

/**
 * Module that provides mongodb connection
 * @author ferrylinton
 * @module Mongodb
 */

/** @typedef {import("mongodb").MongoClient} MongoClient */
/** @typedef {import("mongodb").MongoClientOptions} MongoClientOptions */
/** @typedef {import("mongodb").Collection} Collection */

/**
 * @type {Promise<MongoClient>}
 */
let mongoClient;

/**
 * Get instance of MongoClient
 * @returns {MongoClient}
 */
const getMongoClientInstance = () => {
	/**
	 * @constant {MongoClientOptions} mongoClientOptions - Query options for the mongo client
	 * @see https://www.mongodb.com/docs/manual/reference/connection-string
	 */
	const mongoClientOptions = {
		authMechanism: 'DEFAULT',
		authSource: MONGODB_AUTH_SOURCE,
		monitorCommands: true,
		auth: {
			username: MONGODB_USERNAME,
			password: MONGODB_PASSWORD,
		},
	};

	/**
	 * @constant {string} mongodbURL
	 */
	const mongodbURL = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}`;

	/**
	 * @constant {MongoClient} instance - The MongoClient class
	 * @see https://www.mongodb.com/docs/drivers/node/current/quick-start/create-a-connection-string/
	 */
	const instance = new MongoClient(mongodbURL, mongoClientOptions);

	// Record connection pool events in application.
	// Check this https://www.mongodb.com/docs/drivers/node/current/fundamentals/monitoring/connection-monitoring/
	instance.on('connectionPoolCreated', event =>
		console.log(`[MONGODB] ${JSON.stringify(event)}`)
	);
	instance.on('connectionPoolReady', event => console.log(`[MONGODB] ${JSON.stringify(event)}`));
	instance.on('connectionCreated', event => console.log(`[MONGODB] ${JSON.stringify(event)}`));
	instance.on('connectionClosed', event => console.log(`[MONGODB] ${JSON.stringify(event)}`));

	return instance;
};

/**
 * Get Promise of MongoClient from MongoClient instance
 * @returns {Promise<MongoClient>}
 */
exports.getMongoClient = async () => {
	if (mongoClient === null || mongoClient === undefined) {
		try {
			mongoClient = getMongoClientInstance().connect();
		} catch (error) {
			mongoClient = null;
			console.log(error);
		}

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

	if (connection) {
		const db = connection.db(MONGODB_DATABASE);
		return db.collection(name);
	} else {
		throw new Error('No mongodb connection');
	}
};
