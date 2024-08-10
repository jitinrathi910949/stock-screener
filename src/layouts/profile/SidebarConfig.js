import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { PATH_PROFILE } from 'routes/paths';
import { PATH_SCREENER } from '../../routes/paths';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const ICONS = {
  user: <PersonIcon />,
  screener: getIcon('octicon:graph-24'),
  alert: <NotificationsActiveIcon />,
  dashboard: getIcon('ic_dashboard'),
  employee: <PeopleIcon />
};

const sidebarConfig = [
  {
    title: 'User',
    path: PATH_PROFILE.user,
    icon: ICONS.user
    // children: [
    //   { title: 'profile', path: PATH_DASHBOARD.user.profile },
    //   { title: 'cards', path: PATH_DASHBOARD.user.cards },
    //   { title: 'list', path: PATH_DASHBOARD.user.list },
    //   { title: 'create', path: PATH_DASHBOARD.user.newUser },
    //   { title: 'edit', path: PATH_DASHBOARD.user.editById },
    //   { title: 'account', path: PATH_DASHBOARD.user.account }
    // ]
  },
  { title: 'Your Screener', path: PATH_PROFILE.screener, icon: ICONS.screener },
  { title: 'Your Alerts', path: PATH_PROFILE.alert, icon: ICONS.alert }
];

export default sidebarConfig;
