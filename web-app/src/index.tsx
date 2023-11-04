import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";

import '../public/index.css';
import './static/css/fields.css';

import router from './router';


// @ts-ignore
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
);
