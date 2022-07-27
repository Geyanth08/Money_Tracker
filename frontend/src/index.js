import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { TransactionContextProvider } from './context/TransactionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TransactionContextProvider>
      <App />
    </TransactionContextProvider>
  </React.StrictMode>
);
