import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import client_addressesSlice from './client_addresses/client_addressesSlice';
import clientsSlice from './clients/clientsSlice';
import dish_ingredientsSlice from './dish_ingredients/dish_ingredientsSlice';
import dishesSlice from './dishes/dishesSlice';
import dishes_orderedSlice from './dishes_ordered/dishes_orderedSlice';
import ingredientsSlice from './ingredients/ingredientsSlice';
import ordersSlice from './orders/ordersSlice';
import sourcesSlice from './sources/sourcesSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    client_addresses: client_addressesSlice,
    clients: clientsSlice,
    dish_ingredients: dish_ingredientsSlice,
    dishes: dishesSlice,
    dishes_ordered: dishes_orderedSlice,
    ingredients: ingredientsSlice,
    orders: ordersSlice,
    sources: sourcesSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
