import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './components/store';
import {disableReactDevTools} from '@fvilers/disable-react-devtools';

if (import.meta.env.VITE_ENV === 'production') disableReactDevTools();
console.log (import.meta.env.VITE_ENV)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </Provider>

);
