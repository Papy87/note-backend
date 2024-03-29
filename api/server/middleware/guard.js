const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Utils = require("../utils/Util");
const tokenDecoder = require('../middleware/token_decoder');
const moment = require('moment');
dotenv.config();
const util = new Utils();


const guard = () => {
    return async (req, res, next) => {
        let token = req.headers.authorization.split(' ')[1];
        if (!token) {
            util.setError(400, 'Token no provided.');
            return util.setSuccess(res)
        }
        let {exp} = await tokenDecoder(req);
        const now = moment().valueOf() / 1000;
        if (now > exp) {
            util.setError(400, 'Your token has expired');
            return util.setSuccess(res)
        }
        let verifyToken = jwt.verify(token, process.env.DB_SECRET);
        if (!verifyToken) {
            util.setError(400, 'Bad token');
            return util.setSuccess(res)
        } else {
            next()
        }
    };
};


module.exports = guard;
