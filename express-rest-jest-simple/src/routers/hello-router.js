const express = require('express');
const { getMessage } = require('../services/hello-service');

/**
 * A router that handles hello REST API
 * @author ferrylinton
 * @module TodoRouter
 */

/**
 * Create instance of Express.Router
 */
const router = express.Router();

/**
 * Get message
 */
router.get('/api/hello', async (req, res, next) => {
    try {
        const message = getMessage(req.query.name)
        res.status(200).json({message});
    } catch (error) {
        next(error);
    }
});


module.exports = router;