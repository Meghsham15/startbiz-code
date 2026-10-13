import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const loader = document.getElementById('startbiz-loader');
if (loader) {
  const elapsed = Date.now() - (window.__startbizLoaderAt || Date.now());
  window.setTimeout(() => {
    loader.classList.add('is-done');
    window.setTimeout(() => loader.remove(), 480);
  }, Math.max(0, 700 - elapsed));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
