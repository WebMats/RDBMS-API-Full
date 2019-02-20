const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();


router.get('', async (req, res, next) => {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
})

module.exports = router