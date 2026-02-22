// src/index.js
// Q2 : Fournir le store à l'application via <Provider>

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Provider rend le store Redux accessible à tous les composants */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
