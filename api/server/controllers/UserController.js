const NotesService = require('../services/NoteService');
const Utils = require('../utils/Util');
const jwtDecode = require("jwt-decode");
const util = new Utils();
const UserService = require("../services/UserService")

class UserController {

    static async updateProfil(req, res) {
        let {firstName, lastName, email, password} = req.body;
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            util.setSuccess(400, 'Please enter the necessary information.', {});
            return util.send(res);
        }
        try {
            let userData={firstName,lastName,email,password};
            let update= await UserService.updateProfile(userData)
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }
}

module.exports = UserController;
