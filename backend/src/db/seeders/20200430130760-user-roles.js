const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('OperationsDirector'),
        name: 'Operations Director',
        createdAt,
        updatedAt,
      },

      {
        id: getId('KitchenSupervisor'),
        name: 'Kitchen Supervisor',
        createdAt,
        updatedAt,
      },

      {
        id: getId('OrderCoordinator'),
        name: 'Order Coordinator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('InventorySpecialist'),
        name: 'Inventory Specialist',
        createdAt,
        updatedAt,
      },

      {
        id: getId('CustomerSupport'),
        name: 'Customer Support',
        createdAt,
        updatedAt,
      },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'client_addresses',
      'clients',
      'dish_ingredients',
      'dishes',
      'dishes_ordered',
      'ingredients',
      'orders',
      'sources',
      'roles',
      'permissions',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventorySpecialist'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('CREATE_CLIENT_ADDRESSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('READ_CLIENT_ADDRESSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('UPDATE_CLIENT_ADDRESSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('DELETE_CLIENT_ADDRESSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('UPDATE_CLIENT_ADDRESSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('UPDATE_CLIENT_ADDRESSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventorySpecialist'),
        permissionId: getId('UPDATE_CLIENT_ADDRESSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('CREATE_CLIENT_ADDRESSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('READ_CLIENT_ADDRESSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('UPDATE_CLIENT_ADDRESSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('CREATE_CLIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('READ_CLIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('UPDATE_CLIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('DELETE_CLIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('UPDATE_CLIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('UPDATE_CLIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventorySpecialist'),
        permissionId: getId('UPDATE_CLIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('CREATE_CLIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('READ_CLIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('UPDATE_CLIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('CREATE_DISH_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('READ_DISH_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('UPDATE_DISH_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('DELETE_DISH_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('CREATE_DISH_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('READ_DISH_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('UPDATE_DISH_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('DELETE_DISH_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('UPDATE_DISH_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventorySpecialist'),
        permissionId: getId('UPDATE_DISH_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('UPDATE_DISH_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('CREATE_DISHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('READ_DISHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('UPDATE_DISHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('DELETE_DISHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('CREATE_DISHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('READ_DISHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('UPDATE_DISHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('DELETE_DISHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('UPDATE_DISHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventorySpecialist'),
        permissionId: getId('UPDATE_DISHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('UPDATE_DISHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('CREATE_DISHES_ORDERED'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('READ_DISHES_ORDERED'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('UPDATE_DISHES_ORDERED'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('DELETE_DISHES_ORDERED'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('UPDATE_DISHES_ORDERED'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('CREATE_DISHES_ORDERED'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('READ_DISHES_ORDERED'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('UPDATE_DISHES_ORDERED'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('DELETE_DISHES_ORDERED'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventorySpecialist'),
        permissionId: getId('UPDATE_DISHES_ORDERED'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('UPDATE_DISHES_ORDERED'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('CREATE_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('READ_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('UPDATE_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('DELETE_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('CREATE_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('READ_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('UPDATE_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('DELETE_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('UPDATE_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventorySpecialist'),
        permissionId: getId('CREATE_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventorySpecialist'),
        permissionId: getId('READ_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventorySpecialist'),
        permissionId: getId('UPDATE_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventorySpecialist'),
        permissionId: getId('DELETE_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('UPDATE_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('CREATE_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('READ_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('UPDATE_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('DELETE_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('UPDATE_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('CREATE_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('READ_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('UPDATE_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('DELETE_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventorySpecialist'),
        permissionId: getId('UPDATE_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('CREATE_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('READ_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('UPDATE_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('CREATE_SOURCES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('READ_SOURCES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('UPDATE_SOURCES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('DELETE_SOURCES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('UPDATE_SOURCES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('UPDATE_SOURCES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventorySpecialist'),
        permissionId: getId('UPDATE_SOURCES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('UPDATE_SOURCES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsDirector'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('KitchenSupervisor'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OrderCoordinator'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventorySpecialist'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerSupport'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_CLIENT_ADDRESSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_CLIENT_ADDRESSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_CLIENT_ADDRESSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_CLIENT_ADDRESSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_CLIENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_CLIENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_CLIENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_CLIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_DISH_INGREDIENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_DISH_INGREDIENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_DISH_INGREDIENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_DISH_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_DISHES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_DISHES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_DISHES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_DISHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_DISHES_ORDERED'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_DISHES_ORDERED'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_DISHES_ORDERED'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_DISHES_ORDERED'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_INGREDIENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_INGREDIENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_INGREDIENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_INGREDIENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ORDERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ORDERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ORDERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SOURCES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_SOURCES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_SOURCES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_SOURCES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'OperationsDirector',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'KitchenSupervisor',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
