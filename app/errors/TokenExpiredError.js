const ApplicationError = require('./ApplicationError');

class TokenExpiredError extends ApplicationError {
    constructor(message = 'Token Expired', status = 401) {
        super({ message, status });

        Error.captureStackTrace(this, this.constructor);

        this.code = this.constructor.name;
        this.message = message;
        this.status = status;
    }
}

module.exports = TokenExpiredError;
