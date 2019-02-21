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
        if (!cohort) {
            res.status(404).json({errorMessage: "The cohort with that id does not exist."})
        } else {
            res.status(200).json(cohort);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not fetch cohort."})
    }
})
router.get('/:id/students', async (req, res, next) => {
    try {
        const students = await db('cohorts')
                                            .where({'cohorts.id': req.params.id})
                                            .join('students', 'cohorts.id', '=', 'students.cohort_id')
                                            .select('students.*');
        if (students.length < 1) {
            res.status(404).json({errorMessage: `There are no students in that cohort, or that cohort does not exist...YET`})
        } else {
            res.status(200).json(students)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not get students in the cohort with id that id."})
    }
})
router.put('/:id', async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(404).json({errorMessage: "Please provide us with a name for the new cohort."})
    }
    try {
        const result = await db('cohorts').where({id: req.params.id}).update({name});
        if (!result) {
            res.status(404).json({errorMessage: "Could not update the cohort."})
        } else {
            res.status(201).json(result)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage:"Could not update the cohort."})
    }
})
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await db('cohorts').where({id: req.params.id}).del();
        if (result < 1) {
          res.status(404).json({errorMessage: "The cohort with that id could not be deleted"})
        } else {
          res.status(201).json(result)
        }
      } catch (err) {
        res.status(500).json(err)
      }
})

module.exports = router