const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Resident = sequelize.define('Resident', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    documentType: {
        type: DataTypes.ENUM('dni', 'ce', 'pa'),
        allowNull: false
    },
    documentNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paternalLastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    maternalLastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buildingNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    apartmentNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isOwner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isTenant: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    hasDebt: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});

module.exports = Resident; 