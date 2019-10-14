const { db } = require("../pgAdaptor");
const { GraphQLObjectType, GraphQLID } = require("graphql");
const { UserType } = require("./types");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    type: "Query",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                const query = `SELECT * FROM users WHERE id=$1`;
                const values = [args.id];

                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        },
        users: {
            type: UserType,
            resolve(parentValue) {
                const query = `SELECT * FROM users`
                return db 
                    .many(query)
                    .then(res=> res)
                    .catch(err => err)
            }
        }
    }
});

exports.query = RootQuery;