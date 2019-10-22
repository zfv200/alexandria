const { sequelize } = require('../models/index')
const { GraphQLObjectType, GraphQLID } = require("graphql");
const { UserType, AuthorType } = require("./types");
const { user, book, userbook, author } = sequelize.models

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    type: "Query",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return user.findByPk(args.id)
                .then(res=>res)
                .catch(err=>err)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return author.findByPk(args.id)
                .then(res=>res)
                .catch(err=>err)
            }
        }
        // users: {
        //     type: UserType,
        //     resolve(parentValue) {
        //         return user.findAll()
        //         .then(res=>res.dataValues)
        //         .catch(err=>err)
        //     }
        // }
    }
});

exports.query = RootQuery;