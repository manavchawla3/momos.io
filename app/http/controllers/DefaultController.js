const asyncHandler = require('express-async-handler');
const { makePaginationDataFromRequest } = require('@app/utils/helpers');

const AbstractBaseController = require('./AbstractBaseController');
const { GenericError, ModelNotFoundError } = require('@errors');

class DefaultController extends AbstractBaseController {
    constructor(resource, resoruceService) {
        super(resource, resoruceService);
    }

    loadRoutes() {
        this.router.get('/', asyncHandler(this.fetchAllResources.bind(this)));
        this.router.post('/', asyncHandler(this.createResource.bind(this)));
        this.router.get('/:id', asyncHandler(this.findResourceById.bind(this)));
        this.router.put('/:id', asyncHandler(this.updateResourceById.bind(this)));
        this.router.delete('/:id', asyncHandler(this.deleteResourceById.bind(this)));
    }

    async createResource(req, res) {
        if (!this.resource) throw new Error('Cannot use DefaultController method without setting resource');

        const doc = await this.resourceHandler.create(req.body);

        if (!doc) {
            throw new GenericError(`Couldn't create ${this.resource}!`);
        }

        res.success(doc, `${this.resource} Created Successfully!`);
    }

    async fetchAllResources(req, res) {
        if (!this.resource) throw new Error('Cannot use DefaultController method without setting resource');

        const docs = await this.resourceHandler.findAll(req, makePaginationDataFromRequest(req));

        if (!docs) {
            throw new ModelNotFoundError(`${this.resource} not found!`);
        }

        res.success(docs);
    }

    async findResourceById(req, res) {
        if (!this.resource) throw new Error('Cannot use DefaultController method without setting resource');

        const docs = await this.resourceHandler.findById(req.params.id);

        if (!docs) {
            throw new ModelNotFoundError(`${this.resource} not found!`);
        }

        res.success(docs);
    }

    async updateResourceById(req, res) {
        if (!this.resource) throw new Error('Cannot use DefaultController method without setting resource');

        const updatedDoc = await this.resourceHandler.updateById(req.params.id, req.body);

        if (!updatedDoc) {
            throw new ModelNotFoundError(`${this.resource} couldnot be updated!`);
        }

        res.success(updatedDoc);
    }

    async deleteResourceById(req, res) {
        if (!this.resource) throw new Error('Cannot use DefaultController method without setting resource');

        const deltedDoc = await this.resourceHandler.deleteById(req.params.id);

        if (!deltedDoc) {
            throw new ModelNotFoundError(`${this.resource} not found!`);
        }

        res.success(deltedDoc, `${this.resource} successfully deleted!`);
    }
}

module.exports = DefaultController;
