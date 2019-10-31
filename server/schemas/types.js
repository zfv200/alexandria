const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql;
// const db = require("../pgAdaptor").db;

const { sequelize } = require('../models/index')
const { user, book, userbook, author } = sequelize.models



const AuthorType = new GraphQLObjectType({
    name: "Author",
    // type: "Query", 
    fields: ()=>({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        books: { 
            type: new GraphQLList(BookType), 
            resolve(parentValue, args) {
                return author.findByPk(parentValue.id)
                .then(res=>res.getBooks())
                .then(res=>res)
                .catch(err=>err)
            }
        },
    })
})

const ReviewType = new GraphQLObjectType({
    name: "Review",
    fields: () => ({
        id: { type: GraphQLString },
        content: { type: GraphQLString },
        userRating: { type: GraphQLInt }
    })
})

const BookType = new GraphQLObjectType({
    name: "Book",
    // type: "Query",
    fields: ()=>({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        thumbnail: { type: GraphQLString },
        averageRating: { type: GraphQLInt },
        author: {
            type: AuthorType, 
            resolve(parentValue, args) {
                return book.findByPk(parentValue.id)
                .then(res=>res.getAuthor())
                .then(res=>res)
                .catch(err=>err)
            }
        },
        reviews: {
            type: new GraphQLList(ReviewType),
            resolve(parentValue, args) {
                return book.findByPk(parentValue.id)
                .then(book=>book.getReviews())
            }
        }
    })
})

const UserBookType = new GraphQLObjectType({
    name: "UserBook",
    // type: "Query",
    fields: () => ({
        id: { type: GraphQLString },
        userId: {
            type: GraphQLString
        },
        bookId: {
            type: GraphQLString
        },
    })
})

const UserType = new GraphQLObjectType({
    name: "User",
    // type: "Query",
    fields: ()=>({
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parentValue, args){
                return user.findByPk(parentValue.id)
                .then(res=>res.getBooks())
                .catch(err=>err)
            }
        }
    })
});

exports.UserType = UserType;
exports.BookType = BookType;
exports.AuthorType = AuthorType;
exports.UserBookType = UserBookType;
exports.ReviewType = ReviewType
