const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : 'root',
  database: 'Scheduler',
  dateStrings : true,
});

module.exports = connection;