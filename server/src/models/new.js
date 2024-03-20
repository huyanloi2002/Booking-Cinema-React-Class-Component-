'use strict';
const {
    Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class New extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            New.belongsTo(models.Film, { foreignKey: 'filmId', targetKey: 'id', as: 'filmNews' })
        }
    }
    New.init({
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        filmId: DataTypes.INTEGER,
        imageNew: DataTypes.BLOB('long'),
        imageAuthor: DataTypes.BLOB('long'),
        nameAuthor: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'New',
    });
    return New;
};