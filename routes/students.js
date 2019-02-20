const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();



router.get('', async (req, res, next) => {
    const students = await db('students');
    res.status(200).json(students);
})



module.exports = router