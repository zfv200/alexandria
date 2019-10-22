const userbook = (sequelize, DataTypes) => {
    const UserBook = sequelize.define('userbook', {
        
    })

    // UserBook.associate = (models) => {
    //     UserBook.belongsTo(models.User)
    //     UserBook.belongsTo(models.Book)
    // };

    return UserBook
}

module.exports = userbook