'use strict';
const {
    Models: { MODEL_SCRAP }
} = require('@app/core');

module.exports = (sequelize, DataTypes) => {
    const Scrap = sequelize.define(
        MODEL_SCRAP,
        {
            url: DataTypes.STRING,
            title: DataTypes.STRING
        },
        {
            tableName: 'scraps',
            modelName: MODEL_SCRAP
        }
    );
    return Scrap;
};
