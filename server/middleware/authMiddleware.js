const ApiError = require("../error/ApiError");
const tokenService = require('../services/tokenSevice')

module.exports = function (req, res, next) {
    if(req.method === "OPTIONS") {
        next()
    }
    try {
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader) {
            return next(ApiError.unAuthorizedError())
        }

        const token = authorizationHeader.split(" ")[1]

        if(!token) {
            return next(ApiError.unAuthorizedError())
        }

        const userData = tokenService.validateAccessToken(token)

        if(!userData){
            return next(ApiError.unAuthorizedError())
        }

        req.user = userData;
        next();
    } catch (e) {
        next(ApiError.unAuthorizedError())
    }
}
