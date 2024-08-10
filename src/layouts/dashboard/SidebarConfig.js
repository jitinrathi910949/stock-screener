import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import PeopleIcon from '@mui/icons-material/People';
import { PATH_SCREENER } from 'routes/paths';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  employee: <PeopleIcon />
};

const sidebarConfig = [
  {
    title: 'Stock Screener',
    path: PATH_SCREENER.root,
    icon: getIcon('octicon:graph-24')
  },
  {
    title: 'Forex Screener',
    path: '/scan',
    icon: getIcon('bx:bx-dollar')
  },
  {
    title: 'Crypto Screener',
    path: '/scan',
    icon: getIcon('cib:bitcoin')
  }
  // {
  //   title: 'Consign-Tracker',
  //   path: PATH_DASHBOARD.root,
  //   icon: getIcon(shoppingBagFill),
  //   children: [
  //     { title: 'consign-list', path: PATH_DASHBOARD.general.list },
  //     { title: 'create consign', path: PATH_DASHBOARD.general.create }
  //     // { title: 'edit consign', path: PATH_DASHBOARD.eCommerce.editById }
  //     // { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //     // { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
  //     // { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //     // { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice }
  //   ]
  // }
  // {
  //   title: 'employees',
  //   path: PATH_EMPLOYEE.root,
  //   icon: ICONS.employee,
  //   children: [
  //     { title: 'create', path: PATH_EMPLOYEE.create },
  //     { title: 'list', path: PATH_EMPLOYEE.list }
  //   ]
  // }
  // {
  //   title: 'Consign',
  //   path: '/dashboard/consign',
  //   icon: getIcon(shoppingBagFill)
  // }
];

export default sidebarConfig;
