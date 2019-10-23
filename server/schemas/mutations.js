const graphql = require("graphql");
// const db = require("../pgAdaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLNonNull } = graphql;
const { UserType, UserBookType } = require("./types");
const { sequelize } = require('../models/index')
const { user, book, userbook, author } = sequelize.models

// http://books.google.com/books/content?id=-ON2PwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api

const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    type: "Mutation",
    fields: {
        addBook: {
            type: UserBookType,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                author: { type: new GraphQLNonNull(GraphQLString) },
                thumbnail: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                author.findOrCreate({
                    where: {
                        name: args.author
                    }
                })
                    .then((author, created)=>{
                        const authorId = author[0].dataValues.id
                        return book.findOrCreate({
                            where: {
                                title: args.title,
                                authorId: authorId
                            }
                        })
                    .then((book, created) => {
                        const bookId = book[0].dataValues.id
                        userbook.findOrCreate({
                            where: {
                                userId: args.userId,
                                bookId: bookId
                            }
                        })
                    })
                })
            }
        },
        deleteUserBook: {
            type: UserBookType,
            args: { 
                userId: { type: new GraphQLNonNull(GraphQLID) },
                bookId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parentValue, args){
                userbook.destroy({
                    where: {
                        userId: args.userId,
                        bookId: args.bookId
                    }
                })
            }
        }
    }
});

exports.mutation = RootMutation;