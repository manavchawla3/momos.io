const glob = require('glob');
const path = require('path');

const basename = path.basename(module.filename);

const constants = {};

glob.sync('./app/core/*.js').forEach(function(file) {
    if (basename !== file.split('/').pop()) {
        const resource = file
            .split('/')
            .pop()
            .split('.')
            .shift();

        constants[resource] = require(path.resolve(file));
    }
});

module.exports = constants;
