/**
 * Modifies response object by adding utility functions on it
 */

const _ = require('lodash');
const config = require('config');

const logger = require('@utils/logger');
const {
    LogTypes: { RESPONSE }
} = require('@app/core');

module.exports = {
    modify: app => {
        app.use((req, res, next) => {
            /**
             * success response
             *
             * @param  {[type]} transformerType [description]
             * @param  {[type]} data            [description]
             * @return {[type]}                 [description]
             */
            res.success = (data = null, message = '', meta = null, statusCode = 200) => {
                if (_.isUndefined(data)) {
                    res.status(statusCode);
                    return res.send();
                }

                // Set status code and send response data.
                res.status(statusCode);

                const response = {
                    status: statusCode,
                    success: true
                };

                if (data) {
                    response.data = data;
                }

                if (message) {
                    response.message = message;
                }

                if (meta) {
                    response.meta = meta;
                }

                logger.info({ type: RESPONSE, success: true, message, source: req.ip, user: req.user });

                return res.json(response);
            };

            /**
             * error response
             *
             * @param  {[type]} transformerType [description]
             * @param  {[type]} data            [description]
             * @return {[type]}                 [description]
             */
            res.error = (data = {}, statusCode = 500) => {
                let { code: errorCode = '', message = '', errors = '', stack: errorStack, status = null } = data;
                let response = { success: false, status: status || statusCode, errorCode, message };

                if (errors) {
                    if (errors instanceof Error) {
                        response.error = errors.toString();
                        errorStack = errors.stack;
                    } else if (Array.isArray(errors)) {
                        response.errors = errors;
                    } else {
                        response.errors = errors;
                    }
                }

                if (config.get('api').environment !== 'production') {
                    response.errorStack = errorStack;
                }

                res.status(statusCode);

                return res.json(response);
            };

            next();
        });
    }
};
