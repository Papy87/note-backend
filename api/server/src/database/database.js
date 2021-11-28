const {Pool} = require('pg');

const {DB_CONFIG} = require('../config/config');
const pool = new Pool(DB_CONFIG.development);


class DB {
    static async query(query) {
        return await pool.query(query);
    }
}


module.exports = {DB};



