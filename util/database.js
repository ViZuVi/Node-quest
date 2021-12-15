const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-quest',
  password: '123456Q',
})

module.exports = pool.promise();
