exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema
      .createTableIfNotExists('blocks', (table) => {
        table.increments('index');
        table.string('timestamp');
        table.string('data');
        table.string('previousHash');
        table.string('hash');
        table.timestamps();
      })
  ]);
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('blocks');
};
