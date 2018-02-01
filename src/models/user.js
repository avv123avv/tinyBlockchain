const Bookshelf = require('../config/bookshelf.config');

const User = Bookshelf.Model.extend({
  validations: {
    firstname: {
      method: 'isRequired',
      error: 'Firstname is required'
    },
    surname: {
      method: 'isRequired',
      error: 'Surname is required'
    },
    email: {
      method: 'isLength',
      args: [2, 32],
      error: 'Email length is between 2 and 32'
    },
    password: {
      method: 'isRequired',
      error: 'Password is required'
    }
  },
  
  tableName: 'users',
  hasTimestamps: true,
});

module.exports = Bookshelf.model('User', User);
