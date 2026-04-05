const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'finsecure',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'finsecure_db'
  },
  pool: { min: 2, max: 10 }
});
module.exports = knex;
