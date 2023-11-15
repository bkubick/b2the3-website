import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Outlet, Routes, Route, useLocation } from "react-router-dom";

import ToolMenu from 'src/views/ToolMenu';
import StartupIdeaGenerator from 'src/views/idea-generator/StartupIdeaGenerator';
import CoverLetterGenerator from 'src/views/cover-letter-generator/CoverLetterGenerator';
import PersonalPortfolio from 'src/views/personal-portfolio/PersonalPortfolio';


function RoutesWithAnimation(): React.JSX.Element {
    const location = useLocation();
  
    return (
        <AnimatePresence initial={ false } mode='wait'>
            <Routes location={ location } key={ location.key }>
                <Route path="/" element={<PersonalPortfolio />} />
                <Route path="/tools" element={<Outlet />}>
                    <Route path="" element={<ToolMenu />} />
                    <Route path="startup_idea_generator" element={<StartupIdeaGenerator />} />
                    <Route path="cover_letter_generator" element={<CoverLetterGenerator />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
  }


export default RoutesWithAnimation;
