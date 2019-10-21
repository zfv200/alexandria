// const { gql } = require('apollo-server')

// const typeDefs = gql`
//     type User {
//         id: ID!
//         name: String
//         email: String
//     }

//     type Query {
//         user(id: ID!): User
//     }
// `

// module.exports = typeDefs

const keys = require('../keys')
const { Pool } = require('pg')

const graphql = require('graphql');
const connectionString = 'myURI';

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = graphql;


// postgres setup:
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
})
//on error:
pgClient.on('error', ()=> console.log('PG connection lost'))

//actual schema setup:


    
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        email: { type: GraphQLString}
    })
})

const tableQuery = 'SELECT table_schema,table_name FROM information_schema.tables ORDER BY table_schema, table_name;'

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                const query = `SELECT * FROM "users" WHERE id=${args.id}`;
                return pgClient.query(tableQuery)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'The error is', err;
                    });
            }
        },
        users: {
            type: UserType,
            resolve(parentValue){
                const query = `SELECT * FROM "users"`;
                return pgClient.query(query)
                    .then(data=>{
                        return data;
                    })
                    .catch(err=>{
                        return 'The err is', err;
                    })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})