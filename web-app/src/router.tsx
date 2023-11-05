import React from 'react'
import { createBrowserRouter } from "react-router-dom";

import App from './views/App';
import ToolMenu from './views/tool-menu';
import StartupIdeaGenerator from './views/idea-generator/startup-idea-generator';
import CoverLetterGenerator from './views/cover-letter-generator/cover-letter-generator';
import PersonalPortfolio from './views/personal-portfolio/PersonalPortfolio';


const router = createBrowserRouter([
  {
    element: <App/>,
    children: [  
      {
        path: '/',
        element: <ToolMenu />
      },
      {
        path: "/portfolio",
        element: <PersonalPortfolio />,
      },
      {
        path: "/startup_idea_generator",
        element: <StartupIdeaGenerator />,
      },
      {
        path: "/cover_letter_generator",
        element: <CoverLetterGenerator />,
      },
    ]
  },
]);

export default router;
