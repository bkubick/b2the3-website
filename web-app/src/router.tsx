import React from 'react'
import { createBrowserRouter } from "react-router-dom";

import App from './views/App';
import ToolMenu from './views/tool-menu';
import StartupIdeaGenerator from './views/idea-generator/startup-idea-generator';


const router = createBrowserRouter([
  {
    element: <App/>,
    children: [  
      {
        path: '/',
        element: <ToolMenu />
      },
      {
        path: "/startup_idea_generator",
        element: <StartupIdeaGenerator />,
      },

    ]
  },
]);

export default router;
