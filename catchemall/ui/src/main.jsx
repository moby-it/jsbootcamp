import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProviders } from './providers';
import "./styles/button.css";
import './styles/index.css';
import './styles/typography.css';
import './styles/pokecard.css';
import "./styles/caughtCard.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);