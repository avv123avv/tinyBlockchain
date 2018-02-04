const Bookshelf = require('../config/bookshelf.config');

const Blocks = Bookshelf.Model.extend({
  tableName: 'blocks',
  hasTimestamps: true
});

module.exports = Bookshelf.model('Blocks', Blocks);
