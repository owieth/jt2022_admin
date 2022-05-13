import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './components/dashboard';
import LogoOnlyLayout from './components/shared/LogoOnlyLayout';
import Workshops from './components/workshops/Workshops';
import DashboardOverview from './components/dashboard/DashboardApp';
import Login from './components/login/Login';
import NotFound from './components/fallback/Page404';
import Users from './components/users/Users';
import Workshop from './components/workshops/Workshop';
import Event from './components/events/Event';
import Events from './components/events/Events';

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'overview', element: <DashboardOverview /> },
        { path: 'users', element: <Users /> },
        { path: 'workshops/:id', element: <Workshop /> },
        { path: 'workshops', element: <Workshops /> },
        { path: 'events/:id', element: <Event /> },
        { path: 'events', element: <Events /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/overview" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
