import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import QueryProvider from './providers/QueryProvider';
import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <App />
    </QueryProvider>
  </React.StrictMode>,
);
