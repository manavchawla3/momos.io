const jwt = require('jsonwebtoken');
const config = require('config');

const { UnauthorizedError, TokenInvalidError } = require('@errors');

module.exports = (req, res, next) => {
    function verifyToken(req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            const bearerToken = bearer[0];
            // Set the token
            req.token = bearerToken;
            jwt.verify(req.token, config.get('appKey'), (err, authData) => {
                if (err) {
                    throw new TokenInvalidError();
                } else {
                    req.user = authData;
                    next();
                }
            });
        } else {
            // Forbidden
            throw new UnauthorizedError();
        }
    }
    verifyToken(req, res, next);
};
