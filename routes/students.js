const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();



router.post('', async (req, res, next) => {
    const { name, cohort_id } = req.body;
    if (!name || !cohort_id) {
        return res.status(404).json({errorMessage: "Please provide both name and cohort of new student."})
    }
    try {
        const [id] = await db('students').insert({name, cohort_id});
        res.status(201).json({id});
    } catch (err) {
        console.log(err)
        res.status(500).json({errorMessage: `Could not add ${name} to cohort with id: ${cohort_id}`})
    }
}) 
router.get('', async (req, res, next) => {
    try {
        const students = await db('students');
        res.status(200).json(students);
    } catch (err) {
        console.log(err)
        res.status(500).json({errorMessage: "Could not fetch students."})
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        const student = await db('students').where({id: req.params.id});
        res.status(200).json(student)
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not fetch student."})
    }
})



module.exports = router