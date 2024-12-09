const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class OrdersDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.create(
      {
        id: data.id || undefined,

        order_received: data.order_received || null,
        order_ready: data.order_ready || null,
        order_delivered: data.order_delivered || null,
        order_rejected: data.order_rejected || null,
        repeated: data.repeated || false,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await orders.setClient(data.client || null, {
      transaction,
    });

    await orders.setSource(data.source || null, {
      transaction,
    });

    return orders;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const ordersData = data.map((item, index) => ({
      id: item.id || undefined,

      order_received: item.order_received || null,
      order_ready: item.order_ready || null,
      order_delivered: item.order_delivered || null,
      order_rejected: item.order_rejected || null,
      repeated: item.repeated || false,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const orders = await db.orders.bulkCreate(ordersData, { transaction });

    // For each item created, replace relation files

    return orders;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.findByPk(id, {}, { transaction });

    await orders.update(
      {
        order_received: data.order_received || null,
        order_ready: data.order_ready || null,
        order_delivered: data.order_delivered || null,
        order_rejected: data.order_rejected || null,
        repeated: data.repeated || false,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    await orders.setClient(data.client || null, {
      transaction,
    });

    await orders.setSource(data.source || null, {
      transaction,
    });

    return orders;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of orders) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of orders) {
        await record.destroy({ transaction });
      }
    });

    return orders;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.findByPk(id, options);

    await orders.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await orders.destroy({
      transaction,
    });

    return orders;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.findOne({ where }, { transaction });

    if (!orders) {
      return orders;
    }

    const output = orders.get({ plain: true });

    output.dishes_ordered_order = await orders.getDishes_ordered_order({
      transaction,
    });

    output.client = await orders.getClient({
      transaction,
    });

    output.source = await orders.getSource({
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
        model: db.clients,
        as: 'client',
      },

      {
        model: db.sources,
        as: 'source',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              order_received: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              order_delivered: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.order_receivedRange) {
        const [start, end] = filter.order_receivedRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            order_received: {
              ...where.order_received,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            order_received: {
              ...where.order_received,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.order_readyRange) {
        const [start, end] = filter.order_readyRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            order_ready: {
              ...where.order_ready,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            order_ready: {
              ...where.order_ready,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.order_deliveredRange) {
        const [start, end] = filter.order_deliveredRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            order_delivered: {
              ...where.order_delivered,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            order_delivered: {
              ...where.order_delivered,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.order_rejectedRange) {
        const [start, end] = filter.order_rejectedRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            order_rejected: {
              ...where.order_rejected,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            order_rejected: {
              ...where.order_rejected,
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

      if (filter.repeated) {
        where = {
          ...where,
          repeated: filter.repeated,
        };
      }

      if (filter.client) {
        const listItems = filter.client.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          clientId: { [Op.or]: listItems },
        };
      }

      if (filter.source) {
        const listItems = filter.source.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          sourceId: { [Op.or]: listItems },
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
          count: await db.orders.count({
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
      : await db.orders.findAndCountAll({
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
          Utils.ilike('orders', 'order_received', query),
        ],
      };
    }

    const records = await db.orders.findAll({
      attributes: ['id', 'order_received'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['order_received', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.order_received,
    }));
  }
};
