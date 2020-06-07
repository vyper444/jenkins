const express = require('express');
const app = express();
app.use(express.json());
const port = 3080;
const db = require('./sqlconnection');

app.get('/', (req, res) => res.json('Online'));

/* 
  For login check returns username
  URL:http://localhost:3080/login
  json:{
	"table":"users",
	"username":"dragon",
    "password":"ddr"}
*/
app.post('/login', (req, res) => {
    var keys = Object.keys(req.body);
    var values = Object.values(req.body);
    var Query = `SELECT ${keys[1]} FROM ${values[0]} where ${keys[1]}='${values[1]}' and ${keys[2]}='${values[2]}'`;
    db().query(Query, function(err, rows, fields) {
        console.log(rows);
        res.json(rows);
    });
});

app.listen(port, () => console.log('Connected by port'));