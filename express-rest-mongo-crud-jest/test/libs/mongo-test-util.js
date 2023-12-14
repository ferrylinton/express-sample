const { MongoMemoryServer } = require('mongodb-memory-server');
const { getMongoClient } = require('../../src/configs/mongodb');

// Create an MongoMemoryServer Instance
const mongoServer = new MongoMemoryServer({
	instance: {
		port: 27018
	},
	auth: {
		enable: true,
		extraUsers: [{
			createUser: "admin",
			pwd: "password",
			roles: [{
				role: "readWrite",
				db: "admin"
			}],
			database: "admin"
		}]
	}
});

// Start the MongoMemoryServer
exports.startMongoServer = async () => {
	try {
		await mongoServer.start(true);
		console.log(`mongoServer starting on ${mongoServer.getUri()}`);
	} catch (error) {
		console.log(error);
	}
};

// Stop the current MongoMemoryServer
exports.stopMongoServer = async () => {
	try {
		const connection = await getMongoClient();
		if (connection) {
			// Close the client and its underlying connections
			connection.close();
		}

		await mongoServer.stop();
	} catch (error) {
		console.log(error);
	}
};