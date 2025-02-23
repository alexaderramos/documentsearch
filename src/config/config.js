require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    database: {
        name: process.env.DB_NAME || 'resident_db',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql'
    }
};

module.exports = config; 