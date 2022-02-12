const logger = require('@utils/logger');
const {
    LogTypes: { REQUEST }
} = require('@app/core');

module.exports = (req, res, next) => {
    logger.info({
        type: REQUEST,
        source: req.ip,
        user: req.user,
        url: req.originalUrl
    });
    next();
};
