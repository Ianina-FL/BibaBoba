const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class SourcesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const sources = await db.sources.create(
      {
        id: data.id || undefined,

        source_name: data.source_name || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return sources;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const sourcesData = data.map((item, index) => ({
      id: item.id || undefined,

      source_name: item.source_name || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const sources = await db.sources.bulkCreate(sourcesData, { transaction });

    // For each item created, replace relation files

    return sources;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const sources = await db.sources.findByPk(id, {}, { transaction });

    await sources.update(
      {
        source_name: data.source_name || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return sources;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const sources = await db.sources.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of sources) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of sources) {
        await record.destroy({ transaction });
      }
    });

    return sources;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const sources = await db.sources.findByPk(id, options);

    await sources.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await sources.destroy({
      transaction,
    });

    return sources;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const sources = await db.sources.findOne({ where }, { transaction });

    if (!sources) {
      return sources;
    }

    const output = sources.get({ plain: true });

    output.orders_source = await sources.getOrders_source({
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
    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.source_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('sources', 'source_name', filter.source_name),
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
          count: await db.sources.count({
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
      : await db.sources.findAndCountAll({
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
          Utils.ilike('sources', 'source_name', query),
        ],
      };
    }

    const records = await db.sources.findAll({
      attributes: ['id', 'source_name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['source_name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.source_name,
    }));
  }
};
