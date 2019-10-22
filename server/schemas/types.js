const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;
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
            }
        },
    })
})

const BookType = new GraphQLObjectType({
    name: "Book",
    // type: "Query",
    fields: ()=>({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        author: {
            type: AuthorType, 
            resolve(parentValue, args) {

            }
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
                // return [{
                //     id: "1",
                //     title: "Shrek"
                // }]
                // return db.query('SELECT books.id, books.title FROM books JOIN userbooks ON userbooks.book_id = books.id JOIN users ON userbooks.user_id = users.id')
                // return db.query(`SELECT books.id, books.title, books.author_id FROM books INNER JOIN userbooks ON userbooks.book_id = books.id INNER JOIN users ON userbooks.user_id = ${parentValue.id}`).then(console.log)
            }
        }
        // userbooks: {
        //     type: new GraphQLList(UserBookType),
        //     resolve(parentValue, args) {
        //         return db.query(`SELECT * FROM userbooks WHERE userbooks.user_id = ${parentValue.id}`)
        //     },
        // },
    })
});

const UserBookType = new GraphQLObjectType({
    name: "UserBook",
    // type: "Query",
    fields: () => ({
        id: { type: GraphQLString },
        user_id: {
            type: GraphQLString
        },
        book_id: {
            type: GraphQLString
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parentValue, args){
                return db.query(`SELECT * FROM books WHERE books.id = ${parentValue.book_id}`)
            }
        }
    })
})



exports.UserType = UserType;
exports.BookType = BookType;
exports.AuthorType = AuthorType;
exports.UserBookType = UserBookType;
