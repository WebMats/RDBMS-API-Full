const faker = require('faker');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      let students = [];
      for (let i = 1; i < 100; i++) {
          const studentName = faker.fake("{{name.firstName}} {{name.lastName}}");
          const studentCohortId = Math.floor(Math.random() * 17 + 1)
          students.push({name: studentName, cohort_id: studentCohortId})
      }
      return knex('students').insert(students);
    });
};
