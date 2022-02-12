/**
 * @type Database Utility
 * @desc Utility for connecting to the MongoDB database using mongoose ODM
 */

const { getConnectionClass } = require('@utils/connUtils');

module.exports.connect = async app => {
    if (app.locals.db) return app.locals.db;
    app.locals.db = {};

    try {
        let db = await getConnectionClass().connect();
        if (!db) {
            throw new Error();
        }
        app.locals.db['conn'] = db;
        console.log('📚 Database connection has been established successfully. 📘');
        return db;
    } catch (err) {
        console.log('😞 Unable to connect to the database:', err);
        return null;
    }
};

module.exports.close = (app, done) => {
    if (app.locals.db.conn) {
        close(app.locals.db.conn, err => {
            app.locals.db.conn = null;
            done(err);
            console.log('Database connection has been successfully closed. ❎', err);
        });
    }
};
