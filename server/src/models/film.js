'use strict';
const {
    Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Film extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Film.belongsTo(models.Allcode, { foreignKey: 'genreId', targetKey: 'keyMap', as: 'genreData' })
            Film.belongsTo(models.Allcode, { foreignKey: 'showId', targetKey: 'keyMap', as: 'showData' })
            Film.hasOne(models.Markdown, { foreignKey: 'filmId' })
            Film.hasOne(models.Banner, { foreignKey: 'filmId' })
            Film.hasMany(models.New, { foreignKey: 'filmId', as: 'filmNews' })
            Film.hasMany(models.Booking, { foreignKey: 'filmId', as: 'filmBooking' })
        }
    }
    Film.init({
        nameVi: DataTypes.STRING,
        nameEn: DataTypes.STRING,
        genreId: DataTypes.STRING,
        showId: DataTypes.STRING,
        image: DataTypes.STRING,
        director: DataTypes.STRING,
        actor: DataTypes.STRING,
        dayShow: DataTypes.STRING,
        duration: DataTypes.STRING,
        language: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Film',
    });
    return Film;
};