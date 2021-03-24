import 'primeflex/primeflex.css';
import 'primereact/resources/themes/fluent-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

import PrimeReact from 'primereact/api';

PrimeReact.ripple = true;

const domain: string = process.env.REACT_APP_AUTH0_DOMAIN!!;
const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID!!;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience="heroku-api-oauth">
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);