const Sequelize = require('sequelize')
const keys = require('../keys')


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
    UserBook: sequelize.import('./userbook'),
    Book: sequelize.import('./book'),
    User: sequelize.import('./user'),
    Author: sequelize.import('./author')
}

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models)
    }
})

module.exports = { sequelize, models }

