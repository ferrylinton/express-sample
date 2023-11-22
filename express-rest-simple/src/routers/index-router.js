const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "Horas lae", NODE_ENV: process.env.NODE_ENV });
});

module.exports = router;