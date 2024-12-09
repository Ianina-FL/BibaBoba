import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/client_addresses/client_addresses-list',
    label: 'Client addresses',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiHome ? icon.mdiHome : icon.mdiTable,
    permissions: 'READ_CLIENT_ADDRESSES',
  },
  {
    href: '/clients/clients-list',
    label: 'Clients',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccount ? icon.mdiAccount : icon.mdiTable,
    permissions: 'READ_CLIENTS',
  },
  {
    href: '/dish_ingredients/dish_ingredients-list',
    label: 'Dish ingredients',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFoodApple ? icon.mdiFoodApple : icon.mdiTable,
    permissions: 'READ_DISH_INGREDIENTS',
  },
  {
    href: '/dishes/dishes-list',
    label: 'Dishes',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFood ? icon.mdiFood : icon.mdiTable,
    permissions: 'READ_DISHES',
  },
  {
    href: '/dishes_ordered/dishes_ordered-list',
    label: 'Dishes ordered',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFoodVariant ? icon.mdiFoodVariant : icon.mdiTable,
    permissions: 'READ_DISHES_ORDERED',
  },
  {
    href: '/ingredients/ingredients-list',
    label: 'Ingredients',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiLeaf ? icon.mdiLeaf : icon.mdiTable,
    permissions: 'READ_INGREDIENTS',
  },
  {
    href: '/orders/orders-list',
    label: 'Orders',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiClipboardList ? icon.mdiClipboardList : icon.mdiTable,
    permissions: 'READ_ORDERS',
  },
  {
    href: '/sources/sources-list',
    label: 'Sources',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiSourceBranch ? icon.mdiSourceBranch : icon.mdiTable,
    permissions: 'READ_SOURCES',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline
      ? icon.mdiShieldAccountVariantOutline
      : icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline
      ? icon.mdiShieldAccountOutline
      : icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
