
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Ensure correct import of App component
import { MetaMaskProvider } from './context/MetaMaskContext'; // Import MetaMaskProvider
import { RouterProvider } from 'react-router-dom'; // Import RouterProvider
import { routes } from './routes/routes'; // Import your routes

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MetaMaskProvider>
    <RouterProvider router={routes}> {/* RouterProvider wraps everything */}

      <App />

    </RouterProvider>
  </MetaMaskProvider>
);


