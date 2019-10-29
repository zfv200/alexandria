const review = (sequelize, DataTypes) => {
    const Review = sequelize.define('review', {
        content: {
            type: DataTypes.TEXT
        }
    })

    Review.associate = (models) => {
        Review.belongsTo(models.Book)
    }

    return Review
}

module.exports = review