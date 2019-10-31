const review = (sequelize, DataTypes) => {
    const Review = sequelize.define('review', {
        content: {
            type: DataTypes.TEXT
        },
        userRating: {
            type: DataTypes.INTEGER
        }
    })

    Review.associate = (models) => {
        Review.belongsTo(models.Book),
        Review.belongsTo(models.User)
    }

    return Review
}

module.exports = review