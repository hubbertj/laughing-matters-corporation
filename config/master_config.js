/*  Title: Configurations
    Author:  Hubbert
    Date: Nov 17 2016
    Comment: 
        Master config file, can be overridden by the local config.
*/

module.exports = {
    environment: process.env.mode || 'development',
    npm_package_name: process.env.npm_package_name || 'UNKNOWN',
    server: {
        ip: process.env.app_url || '127.0.0.1',
        port: process.env.PORT || 3000
    },
    database_url: process.env.DATABASE_URL || false,
    secret: process.env.secret || 'dog and cat',
    secure_cookies: process.env.secure_cookies || false 
}
