const ApplicationError = require('./ApplicationError');

class TokenInvalidError extends ApplicationError {
    constructor(message = 'Token Invalid', status = 401) {
        super({ message, status });

        Error.captureStackTrace(this, this.constructor);

        this.code = this.constructor.name;
        this.message = message;
        this.status = status;
    }
}

module.exports = TokenInvalidError;
