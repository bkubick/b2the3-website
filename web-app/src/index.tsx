import React from 'react';
import ReactDOM from 'react-dom/client';

import '../public/index.css';
import './static/css/fields.css';

import App from 'src/views/App';


// @ts-ignore
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
