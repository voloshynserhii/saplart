import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
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
        { path: 'user', element: <UserPage /> },
        { path: 'product/new', element: <ProductAddPage /> },
        { path: 'product/:id', element: <ProductAddPage /> },
        { path: 'product', element: <ProductPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'news', element: <BlogPage /> },
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
