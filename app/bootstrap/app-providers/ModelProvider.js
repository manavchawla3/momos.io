const { getConnectionClass } = require('@utils/connUtils');

/**
 * Loading models onto the app
 */
module.exports = () => {
    return getConnectionClass().loadModels();
};
