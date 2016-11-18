"use strict";

module.exports = {

    setup: function(app) {
        var routerWeb = require('express').Router();
        var Promise = getPromise();
        var moment = getMoment();
        var authorization = global.getAuthorization();

        authorization.ensureRequest.options = {
            onDenied: function(req, res, next) {
                console.log(rejected);
            }
        }

        // setup permission
        var isAuthorizedAdmin = authorization.ensureRequest.isPermitted('restricted:admin');

        routerWeb.get("/", function(req, res) {
            res.redirect("/home");
        });

        //admin routes
        routerWeb.get("/admin", function(req, res) {
            if (req.session.user) {
                var permissions = req.session.user.permissions[0];
                var pArr = permissions.split(",");
                if (pArr.indexOf("admin") > -1 || pArr.indexOf("restricted:admin") > -1) {
                    res.redirect('/admin/dashboard');
                    return;
                }
            }
            res.render("pages/admin/admin_login.ejs", {
                title: 'Admin Login',
                layout: 'layouts/html_admin.ejs',
                data: {}
            });
        });

        routerWeb.get("/admin/dashboard", isAuthorizedAdmin, function(req, res) {
            var uptime = moment().subtract(process.uptime(), 'seconds');
            res.render("pages/admin/admin.ejs", {
                title: 'Admin Dashboard',
                layout: 'layouts/html_admin.ejs',
                data: {
                    uptime: uptime,
                    settings: global.config
                }
            });
        });
        // -- end

        routerWeb.get("/home", function(req, res) {
            res.render("pages/home.ejs", {
                data: {}
            });
        });

        routerWeb.get('/logout', function(req, res) {
            req.session.destroy(function() {
                res.redirect('/login');
                res.end();
            });
        });

        routerWeb.get('/*', function(req, res, next) {
            if (req.originalUrl.split('/').indexOf('api') > -1 || req.originalUrl.split('/').indexOf('application') > -1) {
                next();
            } else if (req.session.user) {
                res.render('pages/bad.ejs', {
                    data: {
                        user: req.session.user,
                        ts: moment().unix()
                    }
                });
            } else {
                res.redirect('/home');
            }
        });

        //pre-route
        app.use(function(req, res, next) {
            var self = this;
            //defaults variables;
            res.locals.login = false;
            res.locals.user = null;
            res.locals.organization = null;
            res.locals.environment = global.config['environment'];
            res.locals.npm_package_name = global.config['npm_package_name'];

            if (typeof req.session.user != 'undefined') {
                res.locals.login = true;
            }
        });

        app.use('', routerWeb);
    }
};
