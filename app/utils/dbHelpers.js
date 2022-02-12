const mongoose = require('mongoose');

module.exports = function() {
    mongoose.Model.findAll = function() {
        return this.find({});
    };
};
