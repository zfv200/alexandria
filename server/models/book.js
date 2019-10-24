const book = (sequelize, DataTypes) => {
    const Book = sequelize.define('book', {
        title: {
            type: DataTypes.STRING,
            unique: false
        }, 
        thumbnail: {
            type: DataTypes.STRING
        }
    })

    Book.associate = (models) => {
        Book.belongsToMany(models.User, {
            through: models.UserBook,
            onDelete: 'CASCADE'
        })

        Book.belongsTo(models.Author)
    }

    return Book 
}

module.exports = book