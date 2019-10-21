const Sequelize = require('sequelize')
const keys = require('../keys')
// const db = require('../pgAdaptor').db

// require('dotenv').config()
// const pgPromise = require('pg-promise')

// const pgp = pgPromise({})

// const config = {
//     user: keys.pgUser,
//     host: keys.pgHost,
//     database: keys.pgDatabase,
//     password: keys.pgPassword,
//     port: keys.pgPort,
// }

// const db = pgp(config)

const sequelize = new Sequelize(
    keys.pgDatabase,
    keys.pgUser,
    keys.pgPassword,
    {
        dialect: 'postgres',
        host: keys.pgHost
    }
)

const models = {
    Book: sequelize.import('./book'),
    User: sequelize.import('./user'),
    Author: sequelize.import('./author'),
    UserBook: sequelize.import('./userbook')
}

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models)
    }
})

module.exports = { sequelize, models }

// export default models
