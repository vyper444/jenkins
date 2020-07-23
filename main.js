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
        try {
            if (rows.length > 0) {
                if (rows[0].username == values[1]) res.json("matched");
            } else {
                res.json("nomatch");
            }
        } catch (e) {
            console.log(e);
            res.json("error");
        }
    });
});
app.post('/register', (req, res) => {
    var keys = Object.keys(req.body);
    var values = Object.values(req.body);
    var Query = `INSERT INTO ${values[0]}(${keys[1]},${keys[2]},${keys[3]}) VALUES('${values[1]}','${values[2]}','${values[3]}')`;
    db().query(Query, function(err, rows, fields) {
        try {
            if (err) {
                console.log("error");
                if (err["errno"] = 1062) {
                    res.json("Usename or ID already Exists");
                } else {
                    res.json("Something went wrong");
                }
            } else {
                console.log("no error");
                res.json("registered");
            }
        } catch (e) {
            console.log("error");
            res.json("error");
        }
    });
});

app.listen(port, () => console.log('Connected by port'));