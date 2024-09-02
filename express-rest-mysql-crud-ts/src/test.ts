import pool from '../src/config/database';
import * as env from "../src/config/env-constant";


(async () => {

    try {
        const result = await pool.query('SELECT * FROM aksara_log');
        console.log(result.rows);
    } catch (error: any) {
        console.log(error);
    } finally {
        setTimeout(function () {
            process.exit();
        }, 500);
    }
})()