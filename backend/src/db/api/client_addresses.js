const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Client_addressesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const client_addresses = await db.client_addresses.create(
      {
        id: data.id || undefined,

        street: data.street || null,
        house_number: data.house_number || null,
        code: data.code || null,
        flat_number: data.flat_number || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await client_addresses.setClient(data.client || null, {
      transaction,
    });

    return client_addresses;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const client_addressesData = data.map((item, index) => ({
      id: item.id || undefined,

      street: item.street || null,
      house_number: item.house_number || null,
      code: item.code || null,
      flat_number: item.flat_number || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const client_addresses = await db.client_addresses.bulkCreate(
      client_addressesData,
      { transaction },
    );

    // For each item created, replace relation files

    return client_addresses;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const client_addresses = await db.client_addresses.findByPk(
      id,
      {},
      { transaction },
    );

    await client_addresses.update(
      {
        street: data.street || null,
        house_number: data.house_number || null,
        code: data.code || null,
        flat_number: data.flat_number || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await client_addresses.setClient(data.client || null, {
      transaction,
    });

    return client_addresses;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const client_addresses = await db.client_addresses.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of client_addresses) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of client_addresses) {
        await record.destroy({ transaction });
      }
    });

    return client_addresses;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const client_addresses = await db.client_addresses.findByPk(id, options);

    await client_addresses.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await client_addresses.destroy({
      transaction,
    });

    return client_addresses;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const client_addresses = await db.client_addresses.findOne(
      { where },
      { transaction },
    );

    if (!client_addresses) {
      return client_addresses;
    }

    const output = client_addresses.get({ plain: true });

    output.client = await client_addresses.getClient({
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
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.street) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('client_addresses', 'street', filter.street),
        };
      }

      if (filter.house_number) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'client_addresses',
            'house_number',
            filter.house_number,
          ),
        };
      }

      if (filter.code) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('client_addresses', 'code', filter.code),
        };
      }

      if (filter.flat_number) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'client_addresses',
            'flat_number',
            filter.flat_number,
          ),
        };
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

      if (filter.client) {
        const listItems = filter.client.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          clientId: { [Op.or]: listItems },
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
          count: await db.client_addresses.count({
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
      : await db.client_addresses.findAndCountAll({
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
          Utils.ilike('client_addresses', 'street', query),
        ],
      };
    }

    const records = await db.client_addresses.findAll({
      attributes: ['id', 'street'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['street', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.street,
    }));
  }
};
