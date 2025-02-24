import React from 'react'; // Import the React library
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import routing components from react-router-dom

// Import page components that represent different views in the app
import HomePage from '../pages/HomePage';
import SpacecraftsPage from '../pages/SpacecraftsPage';
import SpacecraftDetailPage from '../pages/SpacecraftDetailPage';
import ConstructionPage from '../pages/ConstructionPage';
import PlanetsPage from '../pages/PlanetsPage';

// AppRoutes component: sets up the routing structure for the application.
const AppRoutes = () => {
  return (
    // BrowserRouter provides HTML5 history API support for routing.
    <BrowserRouter>
      <Routes>
        {/* Home route: renders HomePage at the root URL */}
        <Route path="/" element={<HomePage />} />
        {/* Route for spacecrafts overview */}
        <Route path="/spacecrafts" element={<SpacecraftsPage />} />
        {/* Dynamic route: renders SpacecraftDetailPage based on the spacecraft id */}
        <Route path="/spacecrafts/:id" element={<SpacecraftDetailPage />} />
        {/* Route for a construction or coming soon page */}
        <Route path="/construct" element={<ConstructionPage />} />
        {/* Route for planets overview */}
        <Route path="/planets" element={<PlanetsPage />} />
        {/* Catch-all route: redirect any unmatched paths to the home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes; // Export the AppRoutes component for use in App.jsx
