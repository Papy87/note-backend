const {Pool} = require('pg');
const {DB_CONFIG} = require('../config/config');
const pool = new Pool(DB_CONFIG.development);
module.exports = {
    pool
}
