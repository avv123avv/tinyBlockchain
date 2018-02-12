const Bookshelf = require('../config/bookshelf.config');

const Blocks = Bookshelf.Model.extend({
  tableName: 'blocks',
  hasTimestamps: true
}, {
  getLastBlock() {
    return new this().query('orderBy', 'index', 'DESC').fetch().then(block => block ? block.toJSON() : null);
  }
});

module.exports = Bookshelf.model('Blocks', Blocks);
