const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define(
        'user',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userName: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            userAdress: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(200),
            },
            password: {
                type: Sequelize.STRING(255),
            },
            phone: {
                type: Sequelize.STRING(12),
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.NOW,
            },
        },
        {
            indexes: [],
            timestamps: true,
        }
    );

    return User;
};
