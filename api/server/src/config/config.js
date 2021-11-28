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
const NODE_MAILER_CONFIG={
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false,
    },
};

module.exports = {
    DB_CONFIG,
    NODE_MAILER_CONFIG
};
