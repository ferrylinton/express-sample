module.exports = {

	// Set of files for which coverage information should be collected
	collectCoverageFrom: [
		'<rootDir>/src/**/*.js',
		'!<rootDir>/test/**'
	],

	// Coverage information will be skipped
	coveragePathIgnorePatterns: [
		"<rootDir>/src/server.js",
	],

	// The test environment that will be used for testing
	testEnvironment: 'node',

	// Automatically clear mock calls, instances, contexts and results before every test
	clearMocks: true,

	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,

	// The directory where Jest should output its coverage files
	coverageDirectory: "coverage",

	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: "v8",

	// Set variables
	setupFiles: ["<rootDir>/test/set-env-vars.js"]
};