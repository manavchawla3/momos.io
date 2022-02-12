/**
 * Defines routes for application
 */
const load = app => {
    /*
    |--------------------------------------------------------------------------
    | Routes
    |--------------------------------------------------------------------------
    |
    | Load all routes in the app
    */
    app.use('', require('@routes'));

    /*
    |--------------------------------------------------------------------------
    | 404
    |--------------------------------------------------------------------------
    |
    | express does treat 404 as error by default
    */
    app.use(function(req, res, next) {
        res.error(
            {
                status: 404,
                message: 'Invalid URL'
            },
            404
        );
    });
};

module.exports = {
    load
};
