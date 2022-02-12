const ApplicationError = require('./ApplicationError');

class UnauthorizedError extends ApplicationError {
    constructor(message = 'Unauthorized', status = 401) {
        super({ message, status });

        Error.captureStackTrace(this, this.constructor);

        this.code = this.constructor.name;
        this.message = message;
        this.status = status;
    }
}

module.exports = UnauthorizedError;
