/**
 * Error Handling Middleware
 */

const { ApplicationError, GenericError } = require('@errors');

const handle = (err, req, res, next) => {
    if (err instanceof ApplicationError) {
        return err.handle(req, res);
    } else {
        return new GenericError('Something Went Wrong!', err).handle(req, res);
    }
};

module.exports = {
    handle
};
