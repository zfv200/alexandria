const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLNonNull, GraphQLList, GraphQLInt } = graphql;
const { UserType, UserBookType, BookType, AuthorType, ReviewType } = require("./types");
const { sequelize } = require('../models/index')
const { user, book, userbook, author, review } = sequelize.models

const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    type: "Mutation",
    fields: {
        addBook: {
            type: BookType,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                authors: { type: new GraphQLList(GraphQLString) },
                thumbnail: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                // const promises = () => args.authors ? args.authors : []

                // this is where multiple authors can be plugged in
                // Promise.all(promises().map(singleAuthor=>{
                //     author.findOrCreate({
                //         where: {
                //             name: singleAuthor
                //         }
                //     })
                // })
                author.findOrCreate({
                    where: {
                        name: args.authors[0]
                    }
                })
                    .then((author, created)=>{
                        const authorId = author[0].dataValues.id
                        return book.findOrCreate({
                            where: {
                                title: args.title,
                                authorId: authorId,
                                thumbnail: args.thumbnail
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
        },
        createBookReview: {
            type: BookType,
            args: {
                bookId: { type: new GraphQLNonNull(GraphQLID) },
                content: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                userRating: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args){
                return review.create({
                    content: args.content,
                    bookId: args.bookId,
                    userId: args.userId,
                    userRating: args.userRating
                })
                .then(review=>review.getBook())
            }
        },
        updateBookReview: {
            type: BookType,
            args: {
                bookId: { type: new GraphQLNonNull(GraphQLID) },
                reviewId: { type: new GraphQLNonNull(GraphQLID) },
                content: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return review.update(
                    {
                        content: args.content,
                    },
                    {
                        where: {
                            id: args.reviewId
                        }
                    }
                )
                .then(reviewId=>review.findByPk(args.reviewId))
                .then(review=>review.getBook())
                .catch(err=>err)
            }
        },
        updateReviewAndAverageReview: {
            type: BookType, 
            args: {
                bookId: { type: new GraphQLNonNull(GraphQLID) },
                reviewId: { type: new GraphQLNonNull(GraphQLID) },
                starRating: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args){
                //update book average rating
                //update book's review's rating
                return review.findByPk(args.reviewId)
                .then(review=>{
                    return Promise.all(
                        [
                            review.update(
                                {
                                    userRating: parseInt(args.starRating)
                                },
                                {
                                    where: {
                                        id: args.reviewId
                                    }
                                }
                            ), 
                            review.getBook(),
                            review.getUser()
                        ]
                    )
                })
                .then(resolutions=>{
                    return Promise.all(
                        [
                            ...resolutions, 
                            resolutions[1].getReviews()
                        ]
                    )
                })
                .then(resolutions=>{
                    const reviews = resolutions[3]
                    let sum = 0;
                    for(let i=0;i<reviews.length;i++){
                        sum += reviews[i].userRating
                    }
                    let newAverage = sum/reviews.length
                    return resolutions[1].update(
                        {
                            averageRating: newAverage
                        }
                    )
                })
                .then(book=>book)
                .catch(err=>err)
            }
        }
    }
});

exports.mutation = RootMutation;