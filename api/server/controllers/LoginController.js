const Utils = require('../utils/Util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const LoginService = require('../services/LoginService');
const UserService = require('../services/UserService');
const {DB} = require("../src/database/database");
dotenv.config();
const util = new Utils();


class LoginController {
    static async login(req, res) {

        let {email, password} = req.body;
        if (!email || !password) {
            util.setSuccess(400, 'Please enter the necessary information.');
            return util.send(res);
        }
        try {
            const loginUser = await LoginService.login(email);
            if (!loginUser.rowCount) {
                util.setError(400, "Wrong username");
                return util.send(res);
            }
            let user = loginUser.rows[0];
            let passwordCheck = await bcrypt.compare(password, user.password);
            if (!passwordCheck) {
                util.setError(400, "Wrong password");
                return util.send(res);
            }
            let token = jwt.sign({
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    userId: user.id,
                }, process.env.DB_SECRET, {expiresIn: '24h'}
            );
            util.setSuccess(200, 'User login successful.', {token});
            DB.endConnection()
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async register(req, res) {
        let {firstName, lastName, email, password, confirmPassword} = req.body;
        if (!firstName || !lastName || !email || !password || !confirmPassword) {

            util.setSuccess(400, 'Please enter the necessary information.', {});
            return util.send(res);
        }
        try {
            if (password !== confirmPassword) {
                util.setSuccess(400, 'Password and confirme password must be the same.');
                return util.send(res);
            }
            let emaileChek = await UserService.emailCheck(email);
            if (emaileChek.rowCount) {
                util.setSuccess(400, 'Email must be unique.');
                return util.send(res);
            }
            let hashPassword = await bcrypt.hash(password, 10);
            let userData = {firstName, lastName, email, password: hashPassword};
            const registration = await LoginService.register(userData);
            if (registration.rowCount) {
                util.setSuccess(200, 'User registration successful.');
            } else {
                util.setSuccess(400, 'User registration failed.');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }
}

module.exports = LoginController;
