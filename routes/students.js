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
        const student = await db('students')
                                            .where({'students.id': req.params.id})
                                            .join('cohorts', {'cohorts.id':'students.cohort_id'})
                                            .select('students.id','students.name', 'cohorts.name as cohort');
        res.status(200).json(student)
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not fetch student."})
    }
})
router.put('/:id', async (req, res, next) => {
    const { name, cohort_id } = req.body;
    if (!name || !cohort_id) {
        return res.status(404).json({errorMessage: "Please provide both name and cohort of new student."})
    }
    try {
        const result = await db('students').where({id: req.params.id}).update({name, cohort_id});
        if (!result) {
            res.status(404).json({errorMessage: "Could not update the student."})
        } else {
            res.status(201).json(result)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage:"Could not update the student."})
    }
})
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await db('students').where({id: req.params.id}).del();
        if (result < 1) {
          res.status(404).json({errorMessage: "The student with that id could not be deleted"})
        } else {
          res.status(201).json(result)
        }
      } catch (err) {
        res.status(500).json(err)
      }
})



module.exports = router