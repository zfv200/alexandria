const graphql = require("graphql");
const db = require("../pgAdaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
const { UserType } = require("./types");

const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    type: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                const query = `INSERT INTO user(name, email) VALUES ($1, $2) RETURNING name`;
                const values = [
                    args.name,
                    args.email
                ];

                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        }
    }
});

exports.mutation = RootMutation;