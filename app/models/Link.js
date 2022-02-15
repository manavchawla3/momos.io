'use strict';
const {
    Models: { MODEL_LINK },
    Link: { LINK_IMAGE, LINK_VIDEO }
} = require('@app/core');
const { model: Scrap } = require('./Scrap');

module.exports = (sequelize, DataTypes) => {
    const Link = sequelize.define(
        MODEL_LINK,
        {
            website_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: Scrap,
                    key: 'id'
                }
            },
            link: {
                type: DataTypes.STRING
            },
            type: {
                type: DataTypes.ENUM,
                values: [LINK_IMAGE, LINK_VIDEO]
            }
        },
        {
            tableName: 'links',
            modelName: MODEL_LINK,
            timestamps: false
        }
    );
    Link.associate = function(models) {
        Link.belongsTo(models.Scrap, { foreignKey: 'website_id', as: 'scraps' });
    };
    return Link;
};
