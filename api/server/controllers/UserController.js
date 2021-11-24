const NotesService = require('../services/NoteService');
const Utils = require('../utils/Util');
const jwtDecode = require("jwt-decode");
const util = new Utils();

class UserController {


    static async emailCheck(email){

        let avaibleEmail= await NotesService.emailCheck(email)
        if(avaibleEmail){

        }

    }
}

module.exports = UserController;
