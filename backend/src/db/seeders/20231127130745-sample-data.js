const db = require('../models');
const Users = db.users;

const ClientAddresses = db.client_addresses;

const Clients = db.clients;

const DishIngredients = db.dish_ingredients;

const Dishes = db.dishes;

const DishesOrdered = db.dishes_ordered;

const Ingredients = db.ingredients;

const Orders = db.orders;

const Sources = db.sources;

const ClientAddressesData = [
  {
    // type code here for "relation_one" field

    street: 'Main St',

    house_number: '123',

    code: '10001',

    flat_number: '1A',
  },

  {
    // type code here for "relation_one" field

    street: 'Broadway',

    house_number: '456',

    code: '10002',

    flat_number: '2B',
  },

  {
    // type code here for "relation_one" field

    street: '5th Ave',

    house_number: '789',

    code: '10003',

    flat_number: '3C',
  },

  {
    // type code here for "relation_one" field

    street: 'Wall St',

    house_number: '101',

    code: '10004',

    flat_number: '4D',
  },

  {
    // type code here for "relation_one" field

    street: 'Park Ave',

    house_number: '202',

    code: '10005',

    flat_number: '5E',
  },
];

const ClientsData = [
  {
    name: 'John Doe',

    phone: '5551234567',
  },

  {
    name: 'Jane Smith',

    phone: '5559876543',
  },

  {
    name: 'Emily Johnson',

    phone: '5557654321',
  },

  {
    name: 'Michael Brown',

    phone: '5552345678',
  },

  {
    name: 'Sarah Davis',

    phone: '5558765432',
  },
];

const DishIngredientsData = [
  {
    // type code here for "relation_one" field

    quantity: 2,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    // type code here for "relation_one" field

    quantity: 1,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    // type code here for "relation_one" field

    quantity: 1,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    // type code here for "relation_one" field

    quantity: 3,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    // type code here for "relation_one" field

    quantity: 4,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },
];

const DishesData = [
  {
    name: 'Poached Egg Sandwich',

    cutlery: true,

    price: 5.99,
  },

  {
    name: 'Pancakes',

    cutlery: true,

    price: 7.49,
  },

  {
    name: 'Porridge',

    cutlery: true,

    price: 4.99,
  },

  {
    name: 'English Breakfast',

    cutlery: true,

    price: 9.99,
  },

  {
    name: 'Draniki',

    cutlery: true,

    price: 6.49,
  },
];

const DishesOrderedData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 2,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 1,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 3,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 1,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 2,
  },
];

const IngredientsData = [
  {
    name: 'Eggs',
  },

  {
    name: 'Flour',
  },

  {
    name: 'Milk',
  },

  {
    name: 'Bacon',
  },

  {
    name: 'Potatoes',
  },
];

const OrdersData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    order_received: new Date('2023-10-01T08:00:00Z'),

    order_ready: new Date('2023-10-01T09:00:00Z'),

    order_delivered: new Date('2023-10-01T10:00:00Z'),

    order_rejected: new Date(),

    repeated: true,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    order_received: new Date('2023-10-02T11:00:00Z'),

    order_ready: new Date('2023-10-02T12:00:00Z'),

    order_delivered: new Date('2023-10-02T13:00:00Z'),

    order_rejected: new Date(),

    repeated: true,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    order_received: new Date('2023-10-03T14:00:00Z'),

    order_ready: new Date('2023-10-03T15:00:00Z'),

    order_delivered: new Date('2023-10-03T16:00:00Z'),

    order_rejected: new Date(),

    repeated: false,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    order_received: new Date('2023-10-04T17:00:00Z'),

    order_ready: new Date('2023-10-04T18:00:00Z'),

    order_delivered: new Date('2023-10-04T19:00:00Z'),

    order_rejected: new Date(),

    repeated: true,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    order_received: new Date('2023-10-05T20:00:00Z'),

    order_ready: new Date('2023-10-05T21:00:00Z'),

    order_delivered: new Date('2023-10-05T22:00:00Z'),

    order_rejected: new Date(),

    repeated: true,
  },
];

const SourcesData = [
  {
    source_name: 'Online',
  },

  {
    source_name: 'Phone',
  },

  {
    source_name: 'App',
  },

  {
    source_name: 'Walk-in',
  },

  {
    source_name: 'Email',
  },
];

// Similar logic for "relation_many"

async function associateClientAddressWithClient() {
  const relatedClient0 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const ClientAddress0 = await ClientAddresses.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ClientAddress0?.setClient) {
    await ClientAddress0.setClient(relatedClient0);
  }

  const relatedClient1 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const ClientAddress1 = await ClientAddresses.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ClientAddress1?.setClient) {
    await ClientAddress1.setClient(relatedClient1);
  }

  const relatedClient2 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const ClientAddress2 = await ClientAddresses.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ClientAddress2?.setClient) {
    await ClientAddress2.setClient(relatedClient2);
  }

  const relatedClient3 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const ClientAddress3 = await ClientAddresses.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ClientAddress3?.setClient) {
    await ClientAddress3.setClient(relatedClient3);
  }

  const relatedClient4 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const ClientAddress4 = await ClientAddresses.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (ClientAddress4?.setClient) {
    await ClientAddress4.setClient(relatedClient4);
  }
}

async function associateDishIngredientWithIngredient_1() {
  const relatedIngredient_10 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient0 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DishIngredient0?.setIngredient_1) {
    await DishIngredient0.setIngredient_1(relatedIngredient_10);
  }

  const relatedIngredient_11 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient1 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DishIngredient1?.setIngredient_1) {
    await DishIngredient1.setIngredient_1(relatedIngredient_11);
  }

  const relatedIngredient_12 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient2 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DishIngredient2?.setIngredient_1) {
    await DishIngredient2.setIngredient_1(relatedIngredient_12);
  }

  const relatedIngredient_13 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient3 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DishIngredient3?.setIngredient_1) {
    await DishIngredient3.setIngredient_1(relatedIngredient_13);
  }

  const relatedIngredient_14 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient4 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DishIngredient4?.setIngredient_1) {
    await DishIngredient4.setIngredient_1(relatedIngredient_14);
  }
}

async function associateDishIngredientWithIngredient_2() {
  const relatedIngredient_20 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient0 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DishIngredient0?.setIngredient_2) {
    await DishIngredient0.setIngredient_2(relatedIngredient_20);
  }

  const relatedIngredient_21 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient1 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DishIngredient1?.setIngredient_2) {
    await DishIngredient1.setIngredient_2(relatedIngredient_21);
  }

  const relatedIngredient_22 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient2 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DishIngredient2?.setIngredient_2) {
    await DishIngredient2.setIngredient_2(relatedIngredient_22);
  }

  const relatedIngredient_23 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient3 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DishIngredient3?.setIngredient_2) {
    await DishIngredient3.setIngredient_2(relatedIngredient_23);
  }

  const relatedIngredient_24 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient4 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DishIngredient4?.setIngredient_2) {
    await DishIngredient4.setIngredient_2(relatedIngredient_24);
  }
}

async function associateDishIngredientWithIngredient_3() {
  const relatedIngredient_30 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient0 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DishIngredient0?.setIngredient_3) {
    await DishIngredient0.setIngredient_3(relatedIngredient_30);
  }

  const relatedIngredient_31 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient1 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DishIngredient1?.setIngredient_3) {
    await DishIngredient1.setIngredient_3(relatedIngredient_31);
  }

  const relatedIngredient_32 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient2 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DishIngredient2?.setIngredient_3) {
    await DishIngredient2.setIngredient_3(relatedIngredient_32);
  }

  const relatedIngredient_33 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient3 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DishIngredient3?.setIngredient_3) {
    await DishIngredient3.setIngredient_3(relatedIngredient_33);
  }

  const relatedIngredient_34 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient4 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DishIngredient4?.setIngredient_3) {
    await DishIngredient4.setIngredient_3(relatedIngredient_34);
  }
}

// Similar logic for "relation_many"

async function associateDishesOrderedWithOrder() {
  const relatedOrder0 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const DishesOrdered0 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DishesOrdered0?.setOrder) {
    await DishesOrdered0.setOrder(relatedOrder0);
  }

  const relatedOrder1 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const DishesOrdered1 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DishesOrdered1?.setOrder) {
    await DishesOrdered1.setOrder(relatedOrder1);
  }

  const relatedOrder2 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const DishesOrdered2 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DishesOrdered2?.setOrder) {
    await DishesOrdered2.setOrder(relatedOrder2);
  }

  const relatedOrder3 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const DishesOrdered3 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DishesOrdered3?.setOrder) {
    await DishesOrdered3.setOrder(relatedOrder3);
  }

  const relatedOrder4 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const DishesOrdered4 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DishesOrdered4?.setOrder) {
    await DishesOrdered4.setOrder(relatedOrder4);
  }
}

async function associateDishesOrderedWithDish() {
  const relatedDish0 = await Dishes.findOne({
    offset: Math.floor(Math.random() * (await Dishes.count())),
  });
  const DishesOrdered0 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DishesOrdered0?.setDish) {
    await DishesOrdered0.setDish(relatedDish0);
  }

  const relatedDish1 = await Dishes.findOne({
    offset: Math.floor(Math.random() * (await Dishes.count())),
  });
  const DishesOrdered1 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DishesOrdered1?.setDish) {
    await DishesOrdered1.setDish(relatedDish1);
  }

  const relatedDish2 = await Dishes.findOne({
    offset: Math.floor(Math.random() * (await Dishes.count())),
  });
  const DishesOrdered2 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DishesOrdered2?.setDish) {
    await DishesOrdered2.setDish(relatedDish2);
  }

  const relatedDish3 = await Dishes.findOne({
    offset: Math.floor(Math.random() * (await Dishes.count())),
  });
  const DishesOrdered3 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DishesOrdered3?.setDish) {
    await DishesOrdered3.setDish(relatedDish3);
  }

  const relatedDish4 = await Dishes.findOne({
    offset: Math.floor(Math.random() * (await Dishes.count())),
  });
  const DishesOrdered4 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DishesOrdered4?.setDish) {
    await DishesOrdered4.setDish(relatedDish4);
  }
}

async function associateOrderWithClient() {
  const relatedClient0 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setClient) {
    await Order0.setClient(relatedClient0);
  }

  const relatedClient1 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setClient) {
    await Order1.setClient(relatedClient1);
  }

  const relatedClient2 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setClient) {
    await Order2.setClient(relatedClient2);
  }

  const relatedClient3 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setClient) {
    await Order3.setClient(relatedClient3);
  }

  const relatedClient4 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Order4 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Order4?.setClient) {
    await Order4.setClient(relatedClient4);
  }
}

async function associateOrderWithSource() {
  const relatedSource0 = await Sources.findOne({
    offset: Math.floor(Math.random() * (await Sources.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setSource) {
    await Order0.setSource(relatedSource0);
  }

  const relatedSource1 = await Sources.findOne({
    offset: Math.floor(Math.random() * (await Sources.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setSource) {
    await Order1.setSource(relatedSource1);
  }

  const relatedSource2 = await Sources.findOne({
    offset: Math.floor(Math.random() * (await Sources.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setSource) {
    await Order2.setSource(relatedSource2);
  }

  const relatedSource3 = await Sources.findOne({
    offset: Math.floor(Math.random() * (await Sources.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setSource) {
    await Order3.setSource(relatedSource3);
  }

  const relatedSource4 = await Sources.findOne({
    offset: Math.floor(Math.random() * (await Sources.count())),
  });
  const Order4 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Order4?.setSource) {
    await Order4.setSource(relatedSource4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await ClientAddresses.bulkCreate(ClientAddressesData);

    await Clients.bulkCreate(ClientsData);

    await DishIngredients.bulkCreate(DishIngredientsData);

    await Dishes.bulkCreate(DishesData);

    await DishesOrdered.bulkCreate(DishesOrderedData);

    await Ingredients.bulkCreate(IngredientsData);

    await Orders.bulkCreate(OrdersData);

    await Sources.bulkCreate(SourcesData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateClientAddressWithClient(),

      await associateDishIngredientWithIngredient_1(),

      await associateDishIngredientWithIngredient_2(),

      await associateDishIngredientWithIngredient_3(),

      // Similar logic for "relation_many"

      await associateDishesOrderedWithOrder(),

      await associateDishesOrderedWithDish(),

      await associateOrderWithClient(),

      await associateOrderWithSource(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('client_addresses', null, {});

    await queryInterface.bulkDelete('clients', null, {});

    await queryInterface.bulkDelete('dish_ingredients', null, {});

    await queryInterface.bulkDelete('dishes', null, {});

    await queryInterface.bulkDelete('dishes_ordered', null, {});

    await queryInterface.bulkDelete('ingredients', null, {});

    await queryInterface.bulkDelete('orders', null, {});

    await queryInterface.bulkDelete('sources', null, {});
  },
};
