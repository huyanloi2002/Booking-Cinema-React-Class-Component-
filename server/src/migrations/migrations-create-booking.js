'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bookings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING
            },
            filmId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            timeType: {
                allowNull: false,
                type: Sequelize.STRING
            },
            date: {
                allowNull: false,
                type: Sequelize.BIGINT
            },
            cinemaTech: {
                allowNull: false,
                type: Sequelize.STRING
            },
            seat1: {
                allowNull: false,
                type: Sequelize.STRING
            },
            seatType: {
                type: Sequelize.STRING
            },
            totalSeat: {
                type: Sequelize.DECIMAL(10, 2)
            },
            combo1: {
                type: Sequelize.STRING
            },
            coutCombo1: {
                type: Sequelize.INTEGER
            },
            totalCombo1: {
                type: Sequelize.DECIMAL(10, 2)
            },
            combo2: {
                type: Sequelize.STRING
            },
            coutCombo2: {
                type: Sequelize.INTEGER
            },
            totalCombo2: {
                type: Sequelize.DECIMAL(10, 2)
            },
            combo3: {
                type: Sequelize.STRING
            },
            coutCombo3: {
                type: Sequelize.INTEGER
            },
            totalCombo3: {
                type: Sequelize.DECIMAL(10, 2)
            },
            totalAll: {
                allowNull: false,
                type: Sequelize.DECIMAL(10, 2)
            },
            payment: {
                allowNull: false,
                type: Sequelize.STRING
            },
            statusId: {
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
        await queryInterface.dropTable('bookings');
    }
};