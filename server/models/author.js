const author = (sequelize, DataTypes) => {
    const Author = sequelize.define('author', {
        name: {
            type: DataTypes.STRING,
            unique: false 
        }
    })

    Author.associate = (models) => {
        Author.hasMany(models.Book), {
            onDelete: 'CASCADE'
        }
    }

    return Author
}

module.exports = author

