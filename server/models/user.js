const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        //to be added with encryption:
        // password: {
        //     type: 
        // }
    })

    User.associate = (models) => {
        User.belongsToMany(models.Book, {
            through: models.UserBook
        })
    }

    return User
}

module.exports = user
