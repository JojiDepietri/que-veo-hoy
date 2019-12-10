//importamos la dependencia mysql
var mysql = require('mysql');

//establecemos la conexión con la base de datos
var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'queveohoy'
});

//exportamos la conexion
module.exports = connection;

