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

var setupWebserver = function(isBootstrap) {
    return new Promise(function(resolve, reject) {
        var express = require('express');
        var cors = require('cors')
        var app = express();
        var routesWeb = require('./app/routes-web');


        return resolve(app);
    });
}

bootstrap.init()
    .then(function(result) {
        console.log(config);
        return setupWebserver(result);
    }).then(function(app) {
        console.log(app);
    });
