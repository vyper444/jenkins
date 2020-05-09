const express = require('express')
const app = express
const port = 3080

app.get('/', (req, res) => res.send('Hello world'))

app.listen(port, () => console.log("Connected by port ${port}"))