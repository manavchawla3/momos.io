const { existsSync: doesFileExists } = require('fs');
const path = require('path');

const DefaultService = require('@services/DefaultService');
const Abstract = require('@lib/classes/Abstract');

class AbstractBaseController extends Abstract {
    constructor(resource, resourceService) {
        super();

        if (this.constructor.name === 'DefaultController') {
            /**
             * Check if resource was provided
             */
            if (!resource) {
                throw new Error('It is mandatory to pass resource to DefaultController');
            }

            /**
             * Make sure resource's corresponding model exists
             */
            const modelsBasePath = `./app/models/${resource}.js`;
            if (!doesFileExists(path.resolve(modelsBasePath))) {
                throw new Error('Resource doesnot exists');
            }
        }

        this.router = require('express').Router();
        this.loadRoutes();

        this.resource = resource;
        this.resourceService = resourceService;
        this.assignDefaultServiceHandler();
    }

    loadRoutes() {
        throw new Error('Child must implement loadRoutes method');
    }

    assignDefaultServiceHandler() {
        if (this.resource) {
            if (this.resourceService) {
                if (this.services[this.resourceService]) {
                    this.resourceHandler = this.resourceService;
                } else {
                    throw new Error('Service Doesnot Exist');
                }
            } else {
                const serviceBasePath = `./app/services/${this.resource}Service.js`;

                if (doesFileExists(path.resolve(serviceBasePath))) {
                    this.resourceHandler = this.services[`${this.resource}Service`];
                } else {
                    this.resourceHandler = new DefaultService(this.resource);
                }
            }

            if (this.resourceHandler) {
                Object.defineProperty(AbstractBaseController.prototype, this.resourceHandler.constructor.name, {
                    get: function() {
                        return this.resourceHandler;
                    }
                });
            }
        }
    }

    get services() {
        return AbstractBaseController.services;
    }

    static injectServices(services) {
        AbstractBaseController.services = { ...services };
    }
}

module.exports = AbstractBaseController;
