const mariadb = require("mariadb")

const config = {
    host : 'localhost',
    user : 'nodeUser',
    password : 'n0d3Us3r',
    database : 'node',
    connetionLimit : 10,

};

const pool = mariadb.createPool(config);

module.exports = pool;