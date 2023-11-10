import React from 'react'
import { createBrowserRouter } from "react-router-dom";

import App from './views/App';
import ToolMenu from './views/ToolMenu';
import StartupIdeaGenerator from './views/idea-generator/StartupIdeaGenerator';
import CoverLetterGenerator from './views/cover-letter-generator/CoverLetterGenerator';
import PersonalPortfolio from './views/personal-portfolio/PersonalPortfolio';


const router = createBrowserRouter([
  {
    element: <App/>,
    children: [  
      {
        path: '/',
        element: <PersonalPortfolio />
      },
      {
        path: "/tools",
        element: <ToolMenu />,
      },
      {
        path: "/tools/startup_idea_generator",
        element: <StartupIdeaGenerator />,
      },
      {
        path: "/tools/cover_letter_generator",
        element: <CoverLetterGenerator />,
      },
    ]
  },
]);

export default router;
