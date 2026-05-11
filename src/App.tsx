import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RefinedCinematicDeveloperPortfolio from './pages/RefinedCinematicDeveloperPortfolio';
function App() {
  return (
    <BrowserRouter>
        <Routes>
			<Route path="/" element={<RefinedCinematicDeveloperPortfolio />} />
			<Route path="/RefinedCinematicDeveloperPortfolio" element={<RefinedCinematicDeveloperPortfolio />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;