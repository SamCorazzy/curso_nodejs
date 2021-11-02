const express = require('express');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.routes();
    }

    routes(){
        this.app.get('/', function (req,res) {
            res.send('Hola Samuel!!! >.<');
       });
    }

    listen(){
        this.app.listen(this.port);
        //localhost:3000
    }
}

module.exports = Server;