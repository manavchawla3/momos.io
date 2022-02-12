const ApplicationError = require('./ApplicationError');

class ForbiddenAccessError extends ApplicationError {
    constructor(message = 'Forbidden Access', status = 403) {
        super({ message, status });

        Error.captureStackTrace(this, this.constructor);

        this.code = this.constructor.name;
        this.message = message;
        this.status = status;
    }
}

module.exports = ForbiddenAccessError;
