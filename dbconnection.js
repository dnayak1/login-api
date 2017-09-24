var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'liverpool',
  database : 'zerion_user'
});

exports.connection=connection;
