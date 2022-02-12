const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const config = require('config');

const routes = require('../modules/routes');
const errors = require('../modules/errors');
const response = require('../modules/response');
const providers = require('../modules/providers');

module.exports = app => {
    /*
    |--------------------------------------------------------------------------
    | Load Controller Provider
    |
    | provide controllers with services
    |--------------------------------------------------------------------------
    |
    */
    providers.load(app, 'controllers');

    /*
    |--------------------------------------------------------------------------
    | Response Modifier
    |
    | adds functions like res.error, res.success etc
    |--------------------------------------------------------------------------
    |
    */
    response.modify(app);

    /*
    |--------------------------------------------------------------------------
    | basic middlewares
    |--------------------------------------------------------------------------
    | bodyParser - to parse request object to JSON
    | cors - to enable cross origin resource sharing
    */
    app.use(
        bodyParser.urlencoded({
            extended: false,
            limit: '50mb'
        })
    );
    app.use(
        bodyParser.json({
            limit: '500mb'
        })
    );
    app.use(
        cors({
            origin: function(origin, callback) {
                if (
                    (config.get('api.cors.whitelist') || []).indexOf(origin) !== -1 ||
                    config.get('api.cors.allowLocal')
                ) {
                    // error - null, allowOrigin - true
                    callback(null, true);
                } else {
                    app.use(function(err, req, res) {
                        res.status(403).json({
                            success: false,
                            statusCode: 'NOT_ALLOWED_BY_CORS',
                            message: 'You are not allowed to access this resource',
                            data: {}
                        });
                    });
                    // error - true, allowOrigin - false
                    callback(true, false);
                }
            }
        })
    );
    /*
    |--------------------------------------------------------------------------
    | Throttling
    |--------------------------------------------------------------------------
    |
    | Apply rate limit to all requests - 429 code will be sent
    */
    const limiter = rateLimit({
        windowMs: config.get('api.rateLimit.minutes') * 60 * 1000, // duration in minutes
        max: config.get('api.rateLimit.maxRequests'), // limit each IP to n (config.maxRequests) requests per windowMs
        message: {
            success: false,
            statusCode: 'TOO_MANY_REQUESTS',
            message: 'Too many requests, please try again later'
        }
    });
    app.use(limiter);

    /*
    |--------------------------------------------------------------------------
    | Setting the static folder
    |--------------------------------------------------------------------------
    |
    | tell express to use the folder as static.
    */
    app.use('/public', express.static(path.join(__dirname, '../public')));

    /*
    |--------------------------------------------------------------------------
    | Load Routes
    |--------------------------------------------------------------------------
    */
    routes.load(app);

    /*
    |--------------------------------------------------------------------------
    | error handler
    |--------------------------------------------------------------------------
    |
    | if a error is not catched, it will end up here.
    */
    app.use(errors.handle);

    /*
    |--------------------------------------------------------------------------
    | Turn On The Lights
    |--------------------------------------------------------------------------
    |
    | start the express server to listen on the port
    */
    app.listen(config.get('api').port, () => console.log(`🔥 App listening on port ${config.get('api').port}! 🚀`));
};
