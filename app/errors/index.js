const glob = require('glob');
const path = require('path');

const basename = path.basename(module.filename);
const errors = {};

/**
 * Load all error classes
 */
glob.sync('./app/errors/*.js').forEach(function(file) {
    if (basename !== file.split('/').pop()) {
        const error = require(path.resolve(file));
        errors[error.name] = error;
    }
});

module.exports = errors;
