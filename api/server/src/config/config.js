const dotenv = require('dotenv');
dotenv.config();


const DB_CONFIG = {
    development: {
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: '5432',
    },
};

module.exports = {
    DB_CONFIG,
};
