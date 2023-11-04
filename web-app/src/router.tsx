import React from 'react'
import { createBrowserRouter } from "react-router-dom";

import App from './views/App';


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
  ]);

export default router;
