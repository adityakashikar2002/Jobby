import React from 'react';
import ReactDOM from 'react-dom/client'; // Changed import
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);