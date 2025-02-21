import { SpaceTravelProvider } from './context/SpaceTravelContext';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';
import styles from './App.module.css';

function App() {
  return (
    <SpaceTravelProvider>
      <div className={styles.app}>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </div>
    </SpaceTravelProvider>
  );
}

export default App;
