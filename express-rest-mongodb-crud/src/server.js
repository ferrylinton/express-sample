const app = require('./app');

/**
 * @constant {number} express application running on this port number
 */
const PORT = 5001;

/**
 * This function is called after the Express application runs
 */
const callback = () => {
    console.log(`[SERVER] Server is running at 'http://127.0.0.1:${PORT}'`);
};

/**
 * This function is the first function to be executed to start Express application.
 */
const main = () => {
    try {
        // this code start express app
        app.listen(PORT, "0.0.0.0", callback);
    } catch (error) {
        //The application will stop if there is an error
        console.log(error);
        process.exit();
    }
};

// Execute main() function
main();