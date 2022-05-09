import Iconify from '../shared/Iconify';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/overview',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'teilnehmer',
    path: '/dashboard/users',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'workshops',
    path: '/dashboard/workshops',
    icon: getIcon('eva:file-text-fill'),
  }
];

export default navConfig;
