const express = require('express');
const app = express();

app.use(express.json());
var db = require('./db');
const { join } = require('path');
const { json } = require('body-parser');

require('dotenv').config();


db.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
});

// Query Function
function query(sql, req, res) {

    db.query(sql, (err, rows, fields) => {
        if (err) res.status(400).send(err);

        res.status(200).json(rows[0]);

    });

}


//GET
app.get('/api/user', function (req, res) {
    query('CALL GetAllActiveUser()', req, res);
});

app.get('/api/user/:id', function (req, res) {
    var i = req.params.id;
    query("CALL getUserById(" + i + ");", req, res);
});

//POST
app.post('/api/user', (req, res) => {

    var emer = req.body.emer;
    var username = req.body.username;
    var pass = req.body.pass;
    var email = req.body.email;
    var dataLindjes = req.body.dataLindjes;

    var sql = "call insert_user('" + emer + "','" + username + "','" + pass + "', '" + email + "','" + dataLindjes + "');";

    query(sql, req, res);
});

//PUT
app.put('/api/user/:id', (req, res) => {
    var id = req.params.id;
    var emer = req.body.emer;
    var username = req.body.username;
    var pass = req.body.pass;
    var email = req.body.email;
    var dataLindjes = req.body.dataLindjes;

    var sql = "CALL updateUser(" + id + ", '" + emer + "', '" + username + "', '" + pass + "', '" + email + "', '" + dataLindjes + "');";

    query(sql, req, res);
});

//DELETE
app.delete('/api/user/:id', (req, res) => {
    var id = req.params.id;
    query("CALL delete_user(" + id + ");", req, res);
});

var PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Now listening on port : ' + PORT);
});