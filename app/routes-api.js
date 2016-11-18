"use strict";
var version  = "/api/v1";

module.exports = {
    setup: function(app) {
        
        //used for checking errors;
        var CONTROLLERS = [
            'registration',
            'patron',
            'account',
            'dashboard',
            'verify',
            'reset',
            'application',
            'game',
            'user',
            'organization']

        // Register account
        app.all(version + '/:type(registration)/:id(*)', function(req, res) {
           getController('account').rest(req, res);
        });

        app.all(version + '/:type(patron)/:id(*)', function(req, res) {
            getController('patron').rest(req, res);
        });

        app.all(version + '/:type(game)/:id(*)', function(req, res) {
            getController('game').rest(req, res);
        });

        app.all(version + '/:type(user)/:id(*)', function(req, res) {
            getController('user').rest(req, res);
        });

        // Account Controller - This should do control any call account related.
        app.all(version + '/:type(account)/:id(*)', function(req, res) {
            getController('account').rest(req, res);
        });

        // Dashboard Controller
        app.all(version + '/:type(dashboard)/:id(*)', function(req, res) {
            getController('dashboard').rest(req, res);
        });

        // Verify account
        app.all(version + '/:type(verify)/:id(*)', function(req, res) {
            getController('account').rest(req, res);
        });

        // Reset password
        app.all(version + '/:type(reset)/:id(*)', function(req, res) {
            getController('reset').rest(req, res);
        });

        // Application servers.
        app.all(version +'/:type(application)/:id(*)', function(req, res){
            getController('application').rest(req, res);
        });

        // Organization
        app.all(version + '/:type(organization)/:id(*)', function(req, res) {
            getController('organization').rest(req, res);
        });

        // Error router.
        app.all(version +'/:type(*)', function(req, res){
            var error = require(GLOBAL.API_DIR + 'error-api');
            var errorApi = new error();
            if(req.params['type'] && CONTROLLERS.indexOf(req.params['type']) > -1){
                var urlWithSlash = req.url + '/';
                res.redirect(urlWithSlash);
            }else{
                errorApi.sendError(1024, 422, res);
            }
        });
    },
};
