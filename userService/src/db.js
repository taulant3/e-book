const mysql = require('mysql');

var con = mysql.createConnection({
    multipleStatements: true,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: 'root',
    password: 'mysqlpassword',
    database: 'e-book',
});

// con.connect(function(err){
//     if(err) throw err
//     console.log("Connected!")
// });


module.exports = con;