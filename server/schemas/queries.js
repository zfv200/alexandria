const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const { UserType, AuthorType, BookType } = require("./types");
const { sequelize } = require('../models/index')
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
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue) {
                return user.findAll()
                .then(res=>res)
                .catch(err=>err)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            args: { userId: { type: GraphQLID } },
            resolve(parentValue, args) {
                return user.findByPk(args.userId)
                .then(targetUser=>{
                    return targetUser.getBooks()
                })
                .catch(err=>err)
            }
        },
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return book.findByPk(args.id)
                .then(book=>book)
                .catch(err=>err)
            }
        }
    }
});

exports.query = RootQuery;