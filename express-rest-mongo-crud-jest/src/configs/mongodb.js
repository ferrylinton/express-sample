const { MongoClient } = require('mongodb');
const { MONGODB_AUTH_SOURCE, MONGODB_DATABASE, MONGODB_PASSWORD, MONGODB_URL, MONGODB_USERNAME } = require('./env-constant');

const mongoClientOptions =  {
    authMechanism: "DEFAULT",
    authSource: MONGODB_AUTH_SOURCE,
    monitorCommands: true,
    auth: {
        username: MONGODB_USERNAME,
        password: MONGODB_PASSWORD
    }
};

const instance =  process.env.NODE_ENV === 'test' ? new MongoClient(MONGODB_URL) : new MongoClient(MONGODB_URL, mongoClientOptions);

const mongoClient = instance.connect();

const getCollection = async (name) => {
    const connection = await mongoClient;
    const db = connection.db(MONGODB_DATABASE);
    return db.collection(name);
}

module.exports = {
    mongoClient,
    getCollection
};