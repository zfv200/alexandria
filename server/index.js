const keys = require('./keys')

//Express server setup:
const express = require('express')
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


// // postgres setup:
// const { Pool } = require('pg')
// const pgClient = new Pool({
//     user: keys.pgUser,
//     host: keys.pgHost,
//     database: keys.pgDatabase,
//     password: keys.pgPassword,
//     port: keys.pgPort
// })
// //on error:
// pgClient.on('error', ()=> console.log('PG connection lost'))

// //actual schema setup:

// pgClient
//     .query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT, email TEXT, created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)')
//     .catch(err=>console.log(err));

// pgClient 
//     .query('CREATE TABLE IF NOT EXISTS books (id SERIAL PRIMARY KEY, title TEXT, description TEXT)')

// pgClient 
//     .query('CREATE TABLE IF NOT EXISTS authors (id SERIAL PRIMARY KEY, name TEXT)')

// pgClient 
//     .query('CREATE TABLE IF NOT EXISTS book_authors (id SERIAL PRIMARY KEY, book_id INTEGER NOT NULL REFERENCES books(id), author_id INTEGER NOT NULL REFERENCES authors(id))')

// pgClient 
//     .query('CREATE TABLE IF NOT EXISTS user_books (id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id), book_id INTEGER NOT NULL REFERENCES books(id))')
//     .catch(err => console.log(err));


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

app.listen(5000, err =>{
    console.log('listening')
})