/**
 * Load Providers
 */
const load = (app, type) => {
    switch (type) {
        case 'db': {
            const models = require('@providers/ModelProvider')();
            app.locals.db['models'] = models;
            break;
        }

        case 'services': {
            const {
                db: { models }
            } = app.locals;

            app.locals.services = require('@providers/ServiceProvider')(models);
            break;
        }

        case 'controllers': {
            const { services } = app.locals;
            require('@providers/ControllerProvider')(services);
            break;
        }

        default:
            throw new Error('Failed to load provider!');
    }
};

module.exports = {
    load
};
