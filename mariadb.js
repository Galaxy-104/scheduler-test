const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : 'root',
  database: 'Scheduler',
  dateStrings : true,
});

connection.query(
    'SELECT * FROM `schedules`',
    function (err, results, fields) {
        console.log(results);
        console.log(fields);
    }
)