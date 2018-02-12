const knex = require('knex')(require('../../knexfile'));
const validator = require('validator');

validator.isRequired = function (val) {
  return val !== null;
};

const Bookshelf = require('bookshelf')(knex);

Bookshelf.plugin('registry');
Bookshelf.plugin('bookshelf-validate', {
  validator,
  validateOnSave: true
});

module.exports = Bookshelf;
