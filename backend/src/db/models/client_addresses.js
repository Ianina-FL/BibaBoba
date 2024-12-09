const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const client_addresses = sequelize.define(
    'client_addresses',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      street: {
        type: DataTypes.TEXT,
      },

      house_number: {
        type: DataTypes.TEXT,
      },

      code: {
        type: DataTypes.TEXT,
      },

      flat_number: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  client_addresses.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.client_addresses.belongsTo(db.clients, {
      as: 'client',
      foreignKey: {
        name: 'clientId',
      },
      constraints: false,
    });

    db.client_addresses.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.client_addresses.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return client_addresses;
};
