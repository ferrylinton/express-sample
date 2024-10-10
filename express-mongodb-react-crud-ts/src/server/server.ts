import app from '@src/server/app';
import { NODE_ENV, PORT } from './utils/env-constant';
import logger from './utils/winston';

/**
 * This function is called after the Express application runs
 */
const callback = () => {
    console.error(`[SERVER] Server is running at 'http://127.0.0.1:${PORT}'`);
    logger.info(`[SERVER] Server is running at 'http://127.0.0.1:${PORT}'`);
    logger.info(`[SERVER] NODE_ENV : ${NODE_ENV}`);
};

/**
 * This function is the first function to be executed to start Express application.
 */
const main = () => {
    try {
        // this code start express app
        app.listen(parseInt(PORT), "0.0.0.0", callback);
    } catch (error) {
        //The application will stop if there is an error
        console.error(error);
        process.exit();
    }
};

// Execute main() function
main();