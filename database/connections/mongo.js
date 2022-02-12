const config = require('config');
const mongoose = require('mongoose');

const BaseConnection = require('./BaseConnection');
const setupHelpers = require('@utils/dbHelpers');

class MongoConnection extends BaseConnection {
    static async connect() {
        let url;
        if (config.has('db.isCluster') && config.get('db.isCluster')) {
            url =
                'mongodb+srv://' +
                config.get('db.username') +
                ':' +
                config.get('db.password') +
                '@' +
                config.get('db.host') +
                '/' +
                config.get('db.database') +
                '?retryWrites=true&w=majority';
        } else {
            url = 'mongodb://' + config.get('db.host') + ':' + config.get('db.port') + '/' + config.get('db.name');
        }

        return await mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    }

    static async close(dbConn, done) {
        dbConn.close(function(err) {
            if (done) {
                done(err);
            }
        });
    }

    static loadModels() {
        /**
         * Setup DB Helpers for all models
         */
        setupHelpers();
        /**
         * Load Models into app
         */
        return super.loadModels();
    }
}

module.exports = MongoConnection;
