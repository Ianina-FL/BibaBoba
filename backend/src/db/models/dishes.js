const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const dishes = sequelize.define(
    'dishes',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      cutlery: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      price: {
        type: DataTypes.DECIMAL,
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

  dishes.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.dishes.hasMany(db.dishes_ordered, {
      as: 'dishes_ordered_dish',
      foreignKey: {
        name: 'dishId',
      },
      constraints: false,
    });

    //end loop

    db.dishes.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.dishes.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return dishes;
};
