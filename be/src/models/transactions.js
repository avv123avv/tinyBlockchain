const Bookshelf = require('../config/bookshelf.config');

const Transactions = Bookshelf.Model.extend({
  tableName: 'transactions',
  hasTimestamps: true
});

module.exports = Bookshelf.model('Transactions', Transactions);
