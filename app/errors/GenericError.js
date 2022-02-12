const ApplicationError = require('./ApplicationError');

class GenericError extends ApplicationError {
    constructor(message = 'Something went wrong. Please try again later', errors = null, status = 400) {
        super({ message, status, errors });

        this.code = this.constructor.name;
        this.message = message;
        this.status = status;
        this.errors = errors;
    }
}

module.exports = GenericError;
