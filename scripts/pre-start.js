/*  Title: pre run
    Author:  Hubbert
    Date: Nov 17 2016
    Comment: 
        This file should setup the configs!
*/
"use strict";
var env = process.env.NODE_ENV;
var mix = require('mix-into');

// Setup the configuration
try {
    var local_config = require('../config/local_config');
    global.config = mix(require('../config/master_config'))
        .into(require('../config/local_config'));
} catch (err) {
    console.error('No local configurations found in config/ Error=' + JSON.stringify(err));
    global.config = require('../config/master_config');
}

if (config.environment === 'development') {
    console.log('Running pre run for development.');
    return;
}

if (config.environment === 'production') {
    console.log('Running pre run for production.');
    return;
}

console.error('No task for environment:', config.environment);
process.exit(1);

