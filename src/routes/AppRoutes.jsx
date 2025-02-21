import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SpacecraftsPage from '../pages/SpacecraftsPage';
import SpacecraftDetailPage from '../pages/SpacecraftDetailPage';
import ConstructionPage from '../pages/ConstructionPage';
import PlanetsPage from '../pages/PlanetsPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spacecrafts" element={<SpacecraftsPage />} />
        <Route path="/spacecrafts/:id" element={<SpacecraftDetailPage />} />
        <Route path="/construct" element={<ConstructionPage />} />
        <Route path="/planets" element={<PlanetsPage />} />
        {/* Redirect all unmatched routes to the home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
