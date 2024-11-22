import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Categories from './pages/Categories';
import Deals from './pages/Deals';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <ProductList />,
      },
      {
        path: '/products/:id',
        element: <ProductDetail />,
      },
      {
        path: '/categories',
        element: <Categories />,
      },
      {
        path: '/deals',
        element: <Deals />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);

export default router;
