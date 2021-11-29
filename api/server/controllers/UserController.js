const Utils = require('../utils/Util');
const bcrypt = require('bcrypt');
const util = new Utils();
const UserService = require("../services/UserService");
const tokenDecoder = require('../middleware/token_decoder');

class UserController {

    static async getUserProfil(req, res) {
        let id = req.params.id;
        let {userId} = await tokenDecoder(req);
        if (Number(id) !== userId) {
            util.setSuccess(400, 'Wrong id');
            return util.send(res)
        }
        try {
            let userProfile = await UserService.getUserProfile(id);
            if (userProfile.rowCount) {
                util.setSuccess(200, 'User found successful.', userProfile.rows[0]);
            } else {
                util.setSuccess(404, 'User not found.');
            }
            return util.send(res);

        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updateUserProfil(req, res) {
        let {firstName, lastName, email} = req.body;
        let id = req.params.id;
        let {userId} = await tokenDecoder(req);
        if (Number(id) !== userId) {
            util.setSuccess(400, 'Wrong id');
            return util.send(res)
        }
        if (!firstName || !lastName || !email) {
            util.setSuccess(400, 'Please enter the necessary information.', {});
            return util.send(res);
        }
        try {
            let updateUser = await UserService.updateProfile(id, firstName, lastName, email)
            if (updateUser.rowCount) {
                util.setSuccess(200, 'User update successful.');
            } else {
                util.setSuccess(400, 'User update failed.');
            }
            return util.send(res);

        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updateUserPassword(req, res) {
        let {oldPassword, newPassword} = req.body;
        let id = req.params.id;
        let {userId} = await tokenDecoder(req);

        if (Number(id) !== userId) {
            util.setSuccess(400, 'Wrong id');
            return util.send(res)
        }
        if (!oldPassword || !newPassword) {
            util.setSuccess(400, 'Please enter the necessary information.', {});
            return util.send(res);
        }
        try {
            let userData = await UserService.getUserPassword(id);
            let userPassword;
            if (!userData.rowCount) {
                util.setError(404, "User not found");
                return util.send(res);
            }
            userPassword = userData.rows[0].password;
            let passwordCheck = await bcrypt.compare(oldPassword, userPassword);
            if (!passwordCheck) {
                util.setError(400, "Wrong password");
                return util.send(res);
            }
            let hashPassword = await bcrypt.hash(newPassword, 10);
            let updateUserPassword = await UserService.updateUserPassword(id, hashPassword);

            if (updateUserPassword.rowCount) {
                util.setSuccess(200, 'User password change successful.');
            } else {
                util.setSuccess(400, 'User password change failed.');
            }
            return util.send(res)

        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async deleteUser(req, res) {
        let id = req.params.id;
        let {userId} = await tokenDecoder(req);
        if (Number(id) !== userId) {
            util.setSuccess(400, 'Wrong id');
            return util.send(res)
        }
        try {
            let userForDelet = await UserService.deleteUser(id);
            if (userForDelet[2].rowCount) {
                util.setSuccess(200, 'User successfully deleted');
            } else {
                util.setSuccess(400, 'User delete failed.');
            }
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }
}

module.exports = UserController;
