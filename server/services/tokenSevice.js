const jwt = require("jsonwebtoken")

class TokenService {

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService();