"use strict";

module.exports = function(sequelize, DataTypes) {
    var SequelizeMeta = sequelize.define("sequelize_meta", {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                //none;
            }
        }
    });

    return SequelizeMeta;
};
