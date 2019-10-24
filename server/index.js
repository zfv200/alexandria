const keys = require('./keys')

//Express server setup:
const express = require('express')
// const models = require('./models/index')
// const { sequelize } = require('./models/index')

const sequelizer = require('./models/index')
const sequelize = sequelizer.sequelize
const models = sequelizer.models


const bodyParser = require('body-parser')
const cors = require('cors')
const versionStart = '/api/v1'

// graphql interface:
const graphql = require("graphql")
const expressGraphQL = require('express-graphql')
const { GraphQLSchema } = graphql 
const { query } = require("./schemas/queries")
const { mutation } = require("./schemas/mutations")

const schema = new GraphQLSchema({
    query, 
    mutation
})

const app = express()

app.use('/api/v1/graphql', bodyParser.json(), cors(), expressGraphQL({
    schema: schema, 
    graphiql: true
}))


//Redis setup:
const redis = require('redis')
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
})

//duplicate connection
const redisPublisher = redisClient.duplicate()


//express route handlers:

app.get(versionStart + "/", (req, res)=>{
    res.send('hi')
})

//to be updated:
app.get(versionStart + '/users', async (req, res)=>{
    const values = await pgClient.query('SELECT * from users')

    res.send(values.rows)
})

app.get(versionStart + '/users/:id/books', async (req, res)=>{
    res.send("made it!")
    // redisClient.hgetall('values', (err, values)=>{
    //     res.send(values)
    // })
})

// app.post('/values', async (req, res)=>{
//     const index = req.body.index 

//     if(parseInt(index)>40){
//         return res.status(422).send('Index too high')

//         redis.Client.hset('values', index, 'Nothing yet')
//         redisPublisher.publish('insert', index)
//         pgClient.query('INSERT INTO values(number) VALUES($1)', [index])

//         res.send({ working: true })

//     }
// })

const eraseDataBaseOnSync = true

sequelize.sync({ force: eraseDataBaseOnSync }).then(async ()=> {
    if (eraseDataBaseOnSync){
        seed()
    }
    app.listen(5000, err =>{
        console.log('listening!!!!!')
    })
})

const seed = async () => {
    await models.User.create(
        {
            username: "zach",
            email: "zach@aol.com",
        }
    )

    await models.Author.create(
        {
            name: "William Stieg"
        }
    )

    await models.Book.create(
        {
            title: "Shrek",
            thumbnail: "http://books.google.com/books/content?id=-ON2PwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            authorId: 1
        }
    ) 

    await models.Book.create(
        {
            title: "Shrek 2",
            thumbnail: "http://books.google.com/books/content?id=-ON2PwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            authorId: 1
        }
    ) 

    await models.Book.create(
        {
            title: "Shrek 3",
            thumbnail: "http://books.google.com/books/content?id=-ON2PwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            authorId: 1
        }
    )

    await models.UserBook.create(
        {
            userId: 1,
            bookId: 1
        }
    )

    await models.UserBook.create(
        {
            userId: 1,
            bookId: 2
        }
    )
}