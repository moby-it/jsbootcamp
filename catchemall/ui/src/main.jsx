import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProviders } from './providers';
import "./styles/button.css";
import "./styles/card.css";
import "./styles/caughtCard.css";
import './styles/index.css';
import "./styles/layout.css";
import './styles/pokecard.css';
import "./styles/reset.css";
import "./styles/spacing.css";
import './styles/typography.css';
// Page styles
import "./styles/pages/login.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProviders>
    <App />
  </AppProviders>
);