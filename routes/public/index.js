const router = require('express').Router();
const path = require('path');
const glob = require('glob');

const basename = path.basename(module.filename);

/**
 * Get All Auth routes from all files
 */
glob.sync('./routes/public/*.js').forEach(function(file) {
    if (basename !== file.split('/').pop()) {
        router.use(require(path.resolve(file)));
    }
});

module.exports = router;
