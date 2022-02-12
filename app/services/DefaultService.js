const mongoose = require('mongoose');

const AbstractBaseService = require('./AbstractBaseService');

class DefaultService extends AbstractBaseService {
    constructor(resource) {
        super(resource);
    }

    async create(data) {
        if (!this.resource) throw new Error('Cannot use DefaultService method without setting resource');

        return await this.resourceModel.create(data);
    }

    async findAll() {
        if (!this.resource) throw new Error('Cannot use DefaultService method without setting resource');

        const docs = await this.resourceModel.findAll({});

        return docs;
    }

    async findById(id) {
        if (!this.resource) throw new Error('Cannot use DefaultService method without setting resource');

        const doc = await this.resourceModel.findById(id);

        return doc;
    }

    async updateById(id, update) {
        if (!this.resource) throw new Error('Cannot use DefaultService method without setting resource');

        const doc = await this.resourceModel.findByIdAndUpdate(id, update, { new: true });

        return doc;
    }

    async deleteById(id) {
        if (!this.resource) throw new Error('Cannot use DefaultService method without setting resource');

        const deltedDoc = await this.resourceModel.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) });

        return deltedDoc;
    }
}

module.exports = DefaultService;
