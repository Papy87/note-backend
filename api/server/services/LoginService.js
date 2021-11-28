const {DB} = require('../src/database/database');
const moment = require("moment");

class LoginService {
    static async login(email) {
        try {
            let query = `SELECT * FROM "users" WHERE email='${email}' ;`;
            return await DB.query(query)
        } catch
            (error) {
            throw error;
        }
    }

    static async register({firstName,lastName,email,password}) {
        try {
            let query = `INSERT INTO "users" (first_name, last_name, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${password}');`;
            return await DB.query(query);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = LoginService;
