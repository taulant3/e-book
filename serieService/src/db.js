const mysql = require('mysql');
require('dotenv').config();

var con = mysql.createConnection({
    multipleStatements: true,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: 'root',
    password: 'mysqlpassword',
    database: 'e-book'
});



module.exports = con;

// con.query('select * from serie', function(err, rows, fields){
//     if(err) throw err;
//     console.log(rows);
// });
