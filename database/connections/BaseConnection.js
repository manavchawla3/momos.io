const glob = require('glob');
const path = require('path');

const Abstract = require('@lib/classes/Abstract');

const models = {};

class BaseConnection extends Abstract {
    static async connect() {
        throw new Error('Child must implement connect method');
    }

    static async close() {
        throw new Error('Child must implement connect method');
    }

    static loadModels() {
        glob.sync('./app/models/*.js').forEach(function(file) {
            let model = require(path.resolve(file));
            models[model.modelName] = model;
        });
        return models;
    }
}

module.exports = BaseConnection;
