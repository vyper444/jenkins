var mysql = require('mysql')

var con = mysql.createConnection({
    host: "aws.ckwkq1hxx6ni.ap-south-1.rds.amazonaws.com",
    port: "3306",
    user: "Admin",
    password: "gzpVTReeGDF5Gjr8YaMD",
    database: "users"
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
})
module.exports = () => { return con }