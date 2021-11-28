const jwtDecode = require('jwt-decode');
const tokenDecoder = async (req) => {
    return await jwtDecode(req.headers.authorization.split(' ')[1])
};
module.exports = tokenDecoder;
