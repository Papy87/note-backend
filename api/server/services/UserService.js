const bcrypt = require('bcrypt');
const moment = require("moment");
const {DB} = require('../src/database/database');


class UserService {

    static async emailCheck(email) {
        let query = `SELECT * FROM users WHERE email='${email}' ;`;
        return await DB.query(query);
    }

    static async updateProfile(userData) {
        let queru=``

    }
}

module.exports = UserService;
