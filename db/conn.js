const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b5a30569057f6e',
  password: '7c826436',
  database: 'heroku_964e8d71783e45a'
})

module.exports = pool;
