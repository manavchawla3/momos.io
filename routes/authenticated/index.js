const router = require('express').Router();
const path = require('path');
const glob = require('glob');

const Authentication = require('@middlewares/auth');
const basename = path.basename(module.filename);

/**
 * Add authentication middleware for auth routes
 */
router.use(Authentication);

/**
 * Get All Auth routes from all files
 */
glob.sync('./routes/authenticated/*.js').forEach(function(file) {
    if (basename !== file.split('/').pop()) {
        router.use(require(path.resolve(file)));
    }
});

module.exports = router;
