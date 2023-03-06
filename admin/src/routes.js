import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import NewsPage from './pages/NewsPage';
import UsersPage from './pages/UsersPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';
import ProductAddPage from './pages/ProductAddPage';

import DashboardPage from './pages/DashboardPage';
import ProtectionPage from './pages/ProtectionPage';
import PaymentPlansPage from './pages/PaymentPlansPage';
import SettingsPage from './pages/SettingsPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: 'auth',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardPage /> },
        { path: 'users', element: <UsersPage /> },
        { path: 'user', element: <ProfilePage /> },
        { path: 'product/new', element: <ProductAddPage /> },
        { path: 'product/:id', element: <ProductAddPage /> },
        { path: 'product', element: <ProductPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'news', element: <NewsPage /> },
        { path: 'protection', element: <ProtectionPage /> },
        { path: 'payment-plans', element: <PaymentPlansPage /> },
        { path: 'settings', element: <SettingsPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/auth" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
