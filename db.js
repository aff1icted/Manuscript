const Pool = require('pg').Pool
const config = require('config')
const pool = new Pool({
    user: config.get('user'),
    password:config.get('password'),
    host:config.get('host'),
    port: config.get('portbd'),
    database: config.get('database')
})

module.exports = pool