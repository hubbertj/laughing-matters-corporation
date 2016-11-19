/*  Title: Main
    Author:  Hubbert
    Date: Nov 17 2016
    Comment: 
        The main file which run then the server starts!
*/
"use strict";

//sets up configurations;
//run the bootstrap files

require("./scripts/pre-start.js");
var bootstrap = require("./bootstrap.js");

var _setupWebserver = function(isBootstrap) {
    return new Promise(function(resolve, reject) {
        var express = require('express');
        var cors = require('cors');
        var app = express();
        var routesWeb = require('./app/routes-web');
        var cookieParser = require('cookie-parser');
        var bodyParser = require('body-parser');
        var sessionFactory = require('./lib/session');
        var expressLayouts = require('express-ejs-layouts');
        var grunt = require("grunt");

        app.use(express.static(__dirname));
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(sessionFactory());
        app.use(cors());
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');
        app.set('layout', 'layouts/html_app');
        app.set('port', config.server.port);
        app.use(expressLayouts);

        routesWeb.setup(app);

        return resolve(app);
    });
}
var _launchApp = function(app) {
    //init database and starts server after the init;
    return global.models.sequelize.sync().then(function() {
        if (global.config['migration_run']) {
            var umzug = new Umzug({
                storage: 'sequelize',
                storageOptions: {
                    sequelize: models.sequelize,
                    model: models.sequelize_meta,
                    modelName: 'sequelize_meta',
                    columnType: new models.Sequelize.STRING(100)
                },
                migrations: { params: [models.sequelize.getQueryInterface(), models.Sequelize] }
            });

            umzug.executed().then(function(migrations) {
                // No need to log this;
                for (var x in migrations) {
                    console.log("Existing migration in system = " + migrations[x].file);
                }

            });
            if (global.config['migration_order'] && global.config['migration_order'] === 'down') {
                return umzug.down();
            } else {
                return umzug.up();
            }
        }
    }).then(function(migrations) {
        if (migrations && migrations.length > 0) {
            if (global.config['migration_order'] && global.config['migration_order'] === 'down') {
                for (var r in migrations) {
                    logger.info("migration applied down() = " + migrations[r].file);
                }
            } else {

                for (var x in migrations) {
                    logger.info("migration applied up() = " + migrations[x].file);
                }
            }

        }
        return new Promise(function(resolve, reject) {
            app.listen(app.get('port'), function() {
                return resolve(arguments);
            });
        });
        // return app.listen(app.get('port'), function() {
        //     logger.info('Loaded configuration: \n' + JSON.stringify(getUtil.inspect(config)));
        //     logger.info('Server started in ' + config.environment + ' mode.');
        //     logger.info('Listening on port: ' + app.get('port') + '\n');
        // });
    });
}

bootstrap.init()
    .then(function(result) {
        if (result) {
            return _setupWebserver(result);
        } else {
            return new Promise(function(resolve, reject) {
                reject('Failed to bootstrap.')
            });
        }
    }).then(function(app) {
        return _launchApp(app);
    }).then(function(result){
        console.log(result);
    }).catch(function(err){
        console.error(err);
    });
