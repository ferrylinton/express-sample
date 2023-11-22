const app = require('./app');

const {PORT} = require('./configs/env-constant');


const callback = () => {
    console.log(`[SERVER] Server is running at 'http://127.0.0.1:${PORT}'`);
};

// this code run async function
(async () => {

    try {
        // this code start express app from ***src\app.js***
        app.listen(parseInt(PORT), "0.0.0.0", callback);
    } catch (error) {
        console.log(error);
        process.exit();
    }

})()