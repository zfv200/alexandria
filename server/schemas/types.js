const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;
const db = require("../pgAdaptor").db;



const BookType = new GraphQLObjectType({
    name: "Book",
    type: "Query",
    fields: ()=>({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        author_id: { type: GraphQLString },

    })
})


const AuthorType = new GraphQLObjectType({
    name: "Author",
    type: "Query", 
    fields: ()=>({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        books: [{ type: new GraphQLList(BookType) }],
    })
})


const UserType = new GraphQLObjectType({
    name: "User",
    type: "Query",
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
    type: "Query",
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





// const ProjectType = new GraphQLObjectType({
//     name: "Project",
//     type: "Query",
//     fields: {
//         id: { type: GraphQLString },
//         creator_id: { type: GraphQLString },
//         created: { type: GraphQLString },
//         title: { type: GraphQLString },
//         description: { type: GraphQLString }
//     }
// });

exports.UserType = UserType;
exports.BookType = BookType;
exports.AuthorType = AuthorType;
exports.UserBookType = UserBookType;
