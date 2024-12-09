module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('dish_ingredients', 'ingredient_2', {
        transaction,
      });

      await queryInterface.addColumn(
        'dish_ingredients',
        'ingredient_2Id',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'ingredients',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'dish_ingredients',
        'ingredient_3Id',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'ingredients',
            key: 'id',
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('dish_ingredients', 'ingredient_3Id', {
        transaction,
      });

      await queryInterface.removeColumn('dish_ingredients', 'ingredient_2Id', {
        transaction,
      });

      await queryInterface.addColumn(
        'dish_ingredients',
        'ingredient_2',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
