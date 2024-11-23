import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import router from './router';
import { store } from './store';
import './index.css';

// Load cart from localStorage
store.dispatch({ type: 'cart/loadCart' });

// Set auth token in axios defaults if it exists
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: 'auth/loadUser' });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Analytics />
    </Provider>
  </React.StrictMode>
);
