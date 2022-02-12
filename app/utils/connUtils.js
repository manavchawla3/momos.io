const config = require('config');
const glob = require('glob');
const path = require('path');

module.exports = {
    getConnectionClass: () => {
        let connectionFileName = config.get('db.driver') + '.js';
        let connectionClass;
        glob.sync(__dirname + '/../../database/connections/*.js').some(function(file) {
            if (connectionFileName == file.split('/').pop()) {
                connectionClass = require(path.resolve(file));
                return true;
            }
            return false;
        });
        if (!connectionClass) {
            throw new Error();
        }
        return connectionClass;
    }
};
