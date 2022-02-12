const logger = require('@utils/logger');
const {
    LogTypes: { ERROR }
} = require('@app/core');

class ApplicationError extends Error {
    constructor({ message = 'Somthing went wrong', status = 500, errors = null } = {}) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.code = this.constructor.name;
        this.message = message;
        this.status = status;
        this.errors = errors;
    }

    handle(req, res) {
        /**
         * Log the error
         */
        const log = {
            type: ERROR,
            description: this.message,
            error: this.errors,
            success: false
        };

        /**
         * If the app is running as server
         * then send the error response.
         */
        if (req) {
            res.error(this, 500);

            log.user = req.user;
            log.data = req.body;
            log.source = req.ip;
            log.url = req.originalUrl;
        }

        logger.error(log);

        return -1;
    }
}

module.exports = ApplicationError;
