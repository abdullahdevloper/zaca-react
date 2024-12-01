import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./components/root/App";
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import configureStore from "./redux/reducers/configureStore"
import { AlertProvider } from '../src/components/dashboard/AlertContext'; // Path to your context file

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore();

root.render(
  <React.StrictMode>
  <Provider store={store}>
      <AlertProvider> {/* Wrap your app with the provider */}
          <App />
      </AlertProvider>
  </Provider>
</React.StrictMode>
);

reportWebVitals();
