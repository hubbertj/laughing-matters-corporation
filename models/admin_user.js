"use strict";

module.exports = function(sequelize, DataTypes) {
    var AdminUser = sequelize.define('admin_user', {
        first_name: {
            type: DataTypes.STRING,
            comment: "Admin accounts first name"
        },
        last_name: {
            type: DataTypes.STRING,
            comment: "Admin accounts last name"
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Admin's username"
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: false,
            comment: "Admin's hashed password"
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: "Is the admin account active or not."
        }
    }, {
        freezeTableName: true,
        tableName: 'admin_user',
        classMethods: {
            //nothing;
        }
    });

    return AdminUser;
}
