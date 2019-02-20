
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      let cohorts = [];
      for (let i = 1; i < 18; i++) {
          cohorts.push({name: `Web${i}`})
      }
      return knex('cohorts').insert(cohorts);
    });
};
