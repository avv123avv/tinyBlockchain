exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema
      .createTableIfNotExists('users', function (table) {
        table.increments('id');
        table.string('email');
        table.string('firstname');
        table.string('surname');
        table.string('password');
        table.timestamps();
      })
  ]);
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
