const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

router.post('', async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(404).json({errorMessage: "Please provide us with a name for the new cohort."})
    }
    try {
        const [id] = await db('cohorts').insert({name});
        res.status(201).json({id});
    } catch(err) {
        console.log(err)
        res.status(500).json({errorMessage: `Could not create cohort ${name}`})
    }
})
router.get('', async (req, res, next) => {
    try {
        const cohorts = await db('cohorts');
        res.status(200).json(cohorts);
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not fetch cohorts."})
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        const cohort = await db('cohorts').where({id: req.params.id}).first()
        res.status(200).json(cohort);
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not fetch cohort."})
    }
})

module.exports = router