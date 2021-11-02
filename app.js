const express = require('express');

const app = express();

app.get('/', function (req,res) { res.send('Hola Samuel!!! >.<'); });

app.listen(3000);
//localhost:3000