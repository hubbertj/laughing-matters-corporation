/*  Title: Bootstrap
    Author:  Hubbert
    Date: Nov 17 2016
    Comment: 
        As the title reads this bootstrap the project up setting up all the globes we need.
*/
"use strict";
global.getPromise = function() {
    return require('bluebird');
}
module.exports = {
    init: function() {
        return new Promise(function(resolve, reject) {
            global.getMoment = function() {
                return require('moment');
            }
            global.logger = require('./lib/logger').init();
            global.models = require("./models");
            global.getDatabase_url = function() {
                if (global.config.database_url) {
                    return global.config.database_url;
                } else if (global.config.database) {
                    var database_url = 'postgres://' + global.config.database.user +
                        ':' + global.config.database.password +
                        '@' + global.config.database.host +
                        ':' + global.config.database.port +
                        '/' + global.config.database.database;
                    return database_url;
                } else {
                    return null;
                }
            }
            global.getdbConnection = function() {
                return require('pg');
            }
            global.getAuthorization = function() {
                return require('express-authorization');
            }



            return resolve(true);
        });
    }
}
