const glob = require('glob');
const path = require('path');
const config = require('config');
const { Sequelize, DataTypes } = require('sequelize');
const _ = require('lodash');

const BaseConnection = require('./BaseConnection');
const { computePaginationMeta } = require('@app/utils/helpers');
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('@app/core/pagination');

const models = {};
let sequelize = null;

class MySqlConnection extends BaseConnection {
    static async connect() {
        sequelize = new Sequelize(config.get('db.database'), config.get('db.username'), config.get('db.password'), {
            host: config.get('db.host'),
            port: config.get('db.port'),
            dialect: 'mysql'
        });

        await sequelize.authenticate();
        return sequelize;
    }

    static async close(dbConn, done) {
        try {
            await dbConn.close();
            if (done) {
                done();
            }
        } catch (err) {
            if (done) {
                done(err);
            }
        }
    }

    static loadModels() {
        glob.sync('./app/models/*.js').forEach(function(file) {
            let model = require(path.resolve(file))(sequelize, DataTypes);
            // adding paginate function to all models
            model.paginate = async function(req, criteria = {}) {
                const page = _.get(req, 'page', DEFAULT_PAGE);
                const limit = _.get(req, 'limit', DEFAULT_LIMIT);
                const offset = page * limit - limit;

                const { rows, count } = await model.findAndCountAll({
                    ...criteria,
                    offset,
                    limit
                });

                const meta = computePaginationMeta({
                    page: page,
                    count,
                    limit
                });

                return { rows, meta };
            };
            models[model.name] = model;
        });

        Object.keys(models).forEach(modelName => {
            if (models[modelName].associate) {
                models[modelName].associate(models);
            }
        });

        return models;
    }
}

module.exports = MySqlConnection;
