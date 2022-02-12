const ApplicationError = require('./ApplicationError');

class ValidationError extends ApplicationError {
    constructor(errors = {}, message = 'Request contain some non-validated data.') {
        super({ message, status: 422, errors });

        this.code = this.constructor.name;
        this.message = message;
        this.status = 422;
        this.errors = errors;
    }
}

module.exports = ValidationError;
