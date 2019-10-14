require('dotenv').config()

const keys = require('./keys')


const pgPromise = require('pg-promise')

const pgp = pgPromise({})

const config = {
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
}

const db = pgp(config)

    db.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT, email TEXT, created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)')
    const queryText = 'INSERT INTO users(name, email) VALUES($1, $2)'
    const values = ["Zach", "zach@aol.com"]

    db.query(queryText, values)

// db.many('SELECT * FROM users').then(res=>console.log(res))

exports.db = db

