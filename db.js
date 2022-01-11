const Pool = require('pg').Pool;

const pool = new Pool({
    user : "postgres",
    password : "asdfgh",
    database : "todos",
    host : "localhost",
    port : 5432
})

module.exports = pool ; 