const express = require('express');

/**
 * Create new Router
 */
const router = express.Router();

// Register request to endpoint with GET method
router.get('/', (req, res) => {
    res.status(200).json({ message: "Horas lae", NODE_ENV: process.env.NODE_ENV });
});

module.exports = router;