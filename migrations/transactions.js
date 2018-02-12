exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema
      .createTableIfNotExists('transactions', (table) => {
        table.increments('index');
        table.string('from');
        table.string('to');
        table.integer('amount').unsigned();
        table.timestamps();
      })
  ]);
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('transactions');
};
