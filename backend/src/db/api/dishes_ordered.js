const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Dishes_orderedDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const dishes_ordered = await db.dishes_ordered.create(
      {
        id: data.id || undefined,

        quantity: data.quantity || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await dishes_ordered.setOrder(data.order || null, {
      transaction,
    });

    await dishes_ordered.setDish(data.dish || null, {
      transaction,
    });

    return dishes_ordered;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const dishes_orderedData = data.map((item, index) => ({
      id: item.id || undefined,

      quantity: item.quantity || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const dishes_ordered = await db.dishes_ordered.bulkCreate(
      dishes_orderedData,
      { transaction },
    );

    // For each item created, replace relation files

    return dishes_ordered;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const dishes_ordered = await db.dishes_ordered.findByPk(
      id,
      {},
      { transaction },
    );

    await dishes_ordered.update(
      {
        quantity: data.quantity || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await dishes_ordered.setOrder(data.order || null, {
      transaction,
    });

    await dishes_ordered.setDish(data.dish || null, {
      transaction,
    });

    return dishes_ordered;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const dishes_ordered = await db.dishes_ordered.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of dishes_ordered) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of dishes_ordered) {
        await record.destroy({ transaction });
      }
    });

    return dishes_ordered;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const dishes_ordered = await db.dishes_ordered.findByPk(id, options);

    await dishes_ordered.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await dishes_ordered.destroy({
      transaction,
    });

    return dishes_ordered;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const dishes_ordered = await db.dishes_ordered.findOne(
      { where },
      { transaction },
    );

    if (!dishes_ordered) {
      return dishes_ordered;
    }

    const output = dishes_ordered.get({ plain: true });

    output.order = await dishes_ordered.getOrder({
      transaction,
    });

    output.dish = await dishes_ordered.getDish({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.orders,
        as: 'order',
      },

      {
        model: db.dishes,
        as: 'dish',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.quantityRange) {
        const [start, end] = filter.quantityRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.order) {
        const listItems = filter.order.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          orderId: { [Op.or]: listItems },
        };
      }

      if (filter.dish) {
        const listItems = filter.dish.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          dishId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.dishes_ordered.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.dishes_ordered.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('dishes_ordered', 'order', query),
        ],
      };
    }

    const records = await db.dishes_ordered.findAll({
      attributes: ['id', 'order'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['order', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.order,
    }));
  }
};
