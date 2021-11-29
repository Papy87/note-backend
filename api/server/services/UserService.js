
const {DB} = require('../src/database/database');


class UserService {

    static async emailCheck(email) {
        try {
            let query = `SELECT * FROM users WHERE email='${email}' ;`;
            return await DB.query(query);
        } catch
            (error) {
            throw error;
        }
    }

    static async updateProfile(id, firstName, lastName, email) {
        try {
            let query = `UPDATE "users"  SET first_name='${firstName}', last_name='${lastName}', email='${email}' WHERE id=${id};`;
            return await DB.query(query);
        } catch
            (error) {
            throw error;
        }
    }

    static async getUserProfile(id) {
        try {
            let query = `SELECT first_name AS firstName,  last_name AS lastName, email  FROM "users" WHERE id=${id};`;
            return await DB.query(query);
        } catch
            (error) {
            throw error;
        }
    }

    static async getUserPassword(id) {
        try {
            let query = `SELECT password  FROM "users" WHERE id=${id};`;
            return await DB.query(query);
        } catch
            (error) {
            throw error;
        }
    }

    static async updateUserPassword(id, password) {
        try {
            let query = `UPDATE "users"  SET password='${password}' WHERE id=${id};`;
            return await DB.query(query);
        } catch
            (error) {
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            let query = `BEGIN; DELETE FROM notes WHERE user_id = ${id}; DELETE FROM users WHERE id = ${id}; COMMIT;`;
            return await DB.query(query);
        } catch
            (error) {
            throw error;
        }
    }
}

module.exports = UserService;
