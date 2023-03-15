// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const getIcon = (icon) => <Iconify icon={`ant-design:${icon}`} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('dashboard-outlined'),
  },
  {
    title: 'IP rights',
    path: '/dashboard/products',
    icon: getIcon('unordered-list-outlined'),
  },
  {
    title: 'Protection requests',
    path: '/dashboard/protection',
    icon: getIcon('safety-certificate-outlined'),
  },
  {
    title: 'Published IPRs',
    path: process.env.REACT_APP_PUBLIC_SITE || 'http://localhost:3000',
    icon: getIcon('coffee-outlined'),
  },
  // {
  //   title: 'Payment plans',
  //   path: '/dashboard/payment-plans',
  //   icon: getIcon('pay-circle-outlined'),
  // },
  // {
  //   title: 'Settings',
  //   path: '/dashboard/settings',
  //   icon: getIcon('setting-outlined'),
  // },
  {
    title: 'Logout',
    path: '/auth',
    icon: getIcon('logout-outlined'),
  },
];

export default navConfig;
