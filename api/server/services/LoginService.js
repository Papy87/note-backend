const {pool} = require('../src/database/database');
const moment = require("moment");

class LoginService {
    static async login(email) {

        try {
            let query = `SELECT * FROM "users" WHERE email='${email}' ;`;
            console.log()
            return await pool.query(query)
        } catch
            (error) {
            throw error;
        }
    }

    static async register(userData) {
        try {
            let query = `INSERT INTO "users" (first_name, last_name, email, password) VALUES ('${userData.firstName}', '${userData.lastName}', '${userData.email}', '${userData.password}');`;

            return await pool.query(query);
        } catch (error) {
            throw error;
        }
    }
}

module
    .exports = LoginService;
