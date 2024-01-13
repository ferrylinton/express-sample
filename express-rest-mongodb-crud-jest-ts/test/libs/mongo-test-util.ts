import { MongoMemoryServer } from 'mongodb-memory-server';
import { getMongoClient, MONGODB_AUTH_SOURCE, MONGODB_DATABASE, MONGODB_PASSWORD, MONGODB_PORT, MONGODB_USERNAME } from '../../src/configs/mongodb';


// Create an Mongo-Memory-Sever Instance
const mongoServer = new MongoMemoryServer({
	instance: {
		port: parseInt(MONGODB_PORT),
		dbName: MONGODB_DATABASE,
	},
	auth: {
		disable: false,
		extraUsers: [{
			createUser: MONGODB_USERNAME as string,
			pwd: MONGODB_PASSWORD as string,
			roles: [{
				role: "readWrite",
				db: "admin"
			}],
			database: MONGODB_AUTH_SOURCE
		}]
	}
});

// Start the Mongod Instance
export async function startMongoServer() {
	try {
		await mongoServer.start(true);
		console.log(`mongoServer starting on ${mongoServer.getUri()}`);
	} catch (error) {
		console.log(error);
	}
}

export async function stopMongoServer() {
	try {
		const connection = await getMongoClient();
		if (connection) {
			// Close the client and its underlying connections
			connection.close();
		}

		// Stop the current In-Memory Instance
		await mongoServer.stop();
	} catch (error) {
		console.log(error);
	}
}
