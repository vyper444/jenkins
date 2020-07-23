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
        res.json("Loggedin");
    });
});
app.post('/register', (req, res) => {
    var keys = Object.keys(req.body);
    var values = Object.values(req.body);
    var Query = `INSERT INTO ${values[0]}(${keys[1]},${keys[2]},${keys[3]}) VALUES('${values[1]}','${values[2]}','${values[3]}')`;
    db().query(Query, function(err, rows, fields) {
        if (err) {
            console.log("error");
            if (err["errno"] = 1062) {
                res.json("Usename or ID already Exists");
            } else {
                res.json("Something wnet wrong");
            }

        } else {
            console.log("no error");
            res.json("OKay");
        }
    });
});

app.listen(port, () => console.log('Connected by port'));