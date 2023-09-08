import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProviders } from './providers';
import "./styles/spacing.css";
import "./styles/button.css";
import './styles/index.css';
import './styles/typography.css';
import './styles/pokecard.css';
import "./styles/caughtCard.css";
import "./styles/card.css";
import "./styles/layout.css";
// Page styles
import "./styles/pages/login.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);