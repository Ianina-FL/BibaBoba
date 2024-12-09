const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const dish_ingredients = sequelize.define(
    'dish_ingredients',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      quantity: {
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

  dish_ingredients.associate = (db) => {
    db.dish_ingredients.belongsToMany(db.ingredients, {
      as: 'dish',
      foreignKey: {
        name: 'dish_ingredients_dishId',
      },
      constraints: false,
      through: 'dish_ingredientsDishIngredients',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.dish_ingredients.belongsTo(db.ingredients, {
      as: 'ingredient_1',
      foreignKey: {
        name: 'ingredient_1Id',
      },
      constraints: false,
    });

    db.dish_ingredients.belongsTo(db.ingredients, {
      as: 'ingredient_2',
      foreignKey: {
        name: 'ingredient_2Id',
      },
      constraints: false,
    });

    db.dish_ingredients.belongsTo(db.ingredients, {
      as: 'ingredient_3',
      foreignKey: {
        name: 'ingredient_3Id',
      },
      constraints: false,
    });

    db.dish_ingredients.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.dish_ingredients.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return dish_ingredients;
};
