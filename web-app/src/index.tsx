import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'src/views/App';
import '../public/index.css';


// @ts-ignore
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
