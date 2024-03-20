'use strict';
const {
    Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Booking.belongsTo(models.Film, { foreignKey: 'filmId', targetKey: 'id', as: 'filmBooking' })
            Booking.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeBooking' })
        }
    }
    Booking.init({
        email: DataTypes.STRING,
        filmId: DataTypes.INTEGER,
        timeType: DataTypes.STRING,
        date: DataTypes.BIGINT,
        cinemaTech: DataTypes.STRING,
        seat1: DataTypes.STRING,
        seatType: DataTypes.STRING,
        totalSeat: DataTypes.DECIMAL(10, 2),
        combo1: DataTypes.STRING,
        combo2: DataTypes.STRING,
        combo3: DataTypes.STRING,
        coutCombo1: DataTypes.INTEGER,
        coutCombo2: DataTypes.INTEGER,
        coutCombo3: DataTypes.INTEGER,
        totalCombo1: DataTypes.DECIMAL(10, 2),
        totalCombo2: DataTypes.DECIMAL(10, 2),
        totalCombo3: DataTypes.DECIMAL(10, 2),
        totalAll: DataTypes.DECIMAL(10, 2),
        payment: DataTypes.STRING,
        statusId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};