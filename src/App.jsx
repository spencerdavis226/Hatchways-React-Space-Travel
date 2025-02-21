import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// PAGES
import HomePage from './pages/HomePage';
import SpacecraftsPage from './pages/SpacecraftsPage';
import SpacecraftDetailPage from './pages/SpacecraftDetailPage';
import ConstructionPage from './pages/ConstructionPage';
import PlanetsPage from './pages/PlanetsPage';
import NotFoundPage from './pages/NotFoundPage';

// STYLES
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="spacecrafts" element={<SpacecraftsPage />} />
        <Route path="spacecrafts/:id" element={<SpacecraftDetailPage />} />
        <Route path="construct" element={<ConstructionPage />} />
        <Route path="planets" element={<PlanetsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
