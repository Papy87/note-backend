const bcrypt = require('bcrypt');
const moment = require("moment");
const {pool} = require('../src/database/database');


class UserService {

    static async emailCheck(email) {
        let count;
        let query = `SELECT * FROM users WHERE email='${email}' ;`;
        return  await pool.query(query);
    }
}

module.exports = UserService;
