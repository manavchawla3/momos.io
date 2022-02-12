const AbstractSingleton = require('@lib/classes/AbstractSingleton');
const { capitalize } = require('@helpers');

class AbstractBaseService extends AbstractSingleton {
    constructor(resource) {
        super('DefaultService');

        /**
         * A simple check to avoid instantiation of DefaultService without a resource
         */
        if (this.constructor.name == 'DefaultService' && !resource) {
            throw new Error('Cannot Instantiate DefaultService without resource');
        }

        if (resource) {
            this.resource = resource;

            this.resourceModel = this.models[resource];

            if (!this.resourceModel) {
                throw new Error('Could not find a model corresponding to passed resource!');
            }
        }
    }

    get models() {
        return AbstractBaseService.models;
    }

    get services() {
        return AbstractBaseService.services;
    }

    static injectModels(models) {
        Object.entries(models).forEach(entry => {
            AbstractBaseService.models[`${entry[0]}`] = entry[1];
        });
    }

    static injectServices(services) {
        Object.entries(services).forEach(([, service]) => {
            AbstractBaseService.services[service.constructor.name] = service;
        });
    }

    /**
     * TODO=> Provide services with other plugins
     */
    static injectProviders() {}
}

AbstractBaseService.models = {};
AbstractBaseService.services = {};
AbstractBaseService.providers = {};

module.exports = AbstractBaseService;
