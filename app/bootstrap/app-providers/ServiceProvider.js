const glob = require('glob');
const path = require('path');

const AbstractBaseService = require('@services/AbstractBaseService');
const DefaultService = require('@services/DefaultService');

module.exports = models => {
    const availableModels = models;

    /**
     * Inject Models, And KafkaAPi on the AbstractBaseService
     * that is inhereted by general purpose services
     */
    AbstractBaseService.injectModels(availableModels);

    const services = {};
    glob.sync('./app/services/*.js').forEach(function(file) {
        const service = require(path.resolve(file));

        if (service.name !== 'AbstractBaseService' && service.name !== 'DefaultService') {
            if (!(service.prototype instanceof DefaultService)) {
                throw new Error(`${service.name} should extend DefaultService`);
            }

            const instance = new service();
            services[instance.constructor.name] = instance;
        }
    });

    /**
     * Inject Models, And KafkaAPi on the AbstractBaseService
     * that is inhereted by general purpose services
     */
    AbstractBaseService.injectServices(services);
    AbstractBaseService.injectProviders();

    return services;
};
