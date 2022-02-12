const ApplicationError = require('./ApplicationError');

class ForbiddenError extends ApplicationError {
    constructor(message = 'Forbidden', status = 403) {
        super({ message, status });

        Error.captureStackTrace(this, this.constructor);

        this.code = this.constructor.name;
        this.message = message;
        this.status = status;
    }
}

module.exports = ForbiddenError;
