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



            return resolve(true);
        });
    }
}
