const express = require('express');

const db = require('./modules/db');
const providers = require('./modules/providers');

module.exports.bootstrap = async () => {
    const app = express();
    app.locals = {};

    /*
    |--------------------------------------------------------------------------
    | Bootstrap DB
    |--------------------------------------------------------------------------
    |
    | connect to mongodb and setup db helpers
    */
    await db.connect(app);

    /*
    |--------------------------------------------------------------------------
    | Load Models And Helpers
    |--------------------------------------------------------------------------
    */
    providers.load(app, 'db');

    /*
    |--------------------------------------------------------------------------
    | Load Service Provider
    |--------------------------------------------------------------------------
    */
    providers.load(app, 'services');

    /*
    |--------------------------------------------------------------------------
    | Start App
    |--------------------------------------------------------------------------
    |
    | start the app in one of the modes (server, kafka, jobs)
    */
    require('./app')(app);

    return app;
};
