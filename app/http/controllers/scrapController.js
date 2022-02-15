const asyncHandler = require('express-async-handler');

const DefaultController = require('./DefaultController');
const { GenericError, ModelNotFoundError } = require('@errors');

const {
    Models: { MODEL_SCRAP }
} = require('@app/core');

class ScrapController extends DefaultController {
    constructor() {
        super(MODEL_SCRAP);
    }

    loadRoutes() {
        this.router.get('/', asyncHandler(this.fetchAllResources.bind(this)));
        this.router.post('/', asyncHandler(this.createResource.bind(this)));
    }
}

module.exports = ScrapController;
