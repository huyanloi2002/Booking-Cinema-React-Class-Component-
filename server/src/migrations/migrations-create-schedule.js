'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('schedules', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            currentNumber: {
                type: Sequelize.INTEGER
            },
            maxNumber: {
                type: Sequelize.INTEGER
            },
            filmId: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.STRING
            },
            cinemaTech: {
                type: Sequelize.STRING
            },
            timeType: {
                type: Sequelize.STRING
            },
            seatType: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.STRING
            },
            seat: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('schedules');
    }
};