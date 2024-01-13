import { Collection, Document, MongoClient, MongoClientOptions } from 'mongodb';

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
    instance.on('connectionPoolCreated', (event) => console.log(`[MONGODB] ${JSON.stringify(event)}`));
    instance.on('connectionPoolReady', (event) => console.log(`[MONGODB] ${JSON.stringify(event)}`));
    instance.on('connectionCreated', (event) => console.log(`[MONGODB] ${JSON.stringify(event)}`));
    instance.on('connectionClosed', (event) => console.log(`[MONGODB] ${JSON.stringify(event)}`));
    instance.on('commandStarted', started => console.log(started));
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
