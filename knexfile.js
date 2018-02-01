const db = (process.env.NODE_ENV === 'dev') ? 'tinyBlockchain_dev' : 'tinyBlockchain'

module.exports = {
  
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: db,
    charset: 'utf8'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
  
};
