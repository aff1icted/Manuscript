const {Sequelize} = require('sequelize')

const config = require('config')
/*
module.exports = new Sequelize(
    config.get('database'),
    config.get('user'),
    config.get('password'),
    {
        dialect:'postgres',
        host:config.get('host'),
        port:config.get('portbd')
    }
)*/


module.exports = new Sequelize(
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)

/*
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

*/
