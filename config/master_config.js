module.exports = {
    environment: process.env.mode || 'development',
    npm_package_name: process.env.npm_package_name || 'UNKNOWN',
    server: {
        ip: process.env.app_url || '127.0.0.1',
        port: process.env.PORT || 3000
    },
    database_url: process.env.DATABASE_URL || false
}
