const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const sources = sequelize.define(
    'sources',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      source_name: {
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

  sources.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.sources.hasMany(db.orders, {
      as: 'orders_source',
      foreignKey: {
        name: 'sourceId',
      },
      constraints: false,
    });

    //end loop

    db.sources.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.sources.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return sources;
};
