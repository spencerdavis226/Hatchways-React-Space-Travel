import { SpaceTravelProvider } from './context/SpaceTravelContext'; // Provides global state and data for the app
import AppRoutes from './routes/AppRoutes'; // Defines the routing for different pages in the app
import ErrorBoundary from './components/ErrorBoundary'; // Catches and handles errors in the component tree
import styles from './App.module.css'; // Import CSS module for styling the App component

function App() {
  return (
    // Wrap the entire app in the SpaceTravelProvider for shared state
    <SpaceTravelProvider>
      <div className={styles.app}>
        {' '}
        {/* Main container styled with CSS modules */}
        <ErrorBoundary>
          {' '}
          {/* Error boundary to catch and display errors gracefully */}
          <AppRoutes /> {/* Render routes for navigation */}
        </ErrorBoundary>
      </div>
    </SpaceTravelProvider>
  );
}

export default App; // Export the App component as the default export
