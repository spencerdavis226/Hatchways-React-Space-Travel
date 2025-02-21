import { SpaceTravelProvider } from './context/SpaceTravelContext';
import AppRoutes from './routes/AppRoutes';
import styles from './App.module.css';

function App() {
  return (
    <SpaceTravelProvider>
      <div className={styles.app}>
        <AppRoutes />
      </div>
    </SpaceTravelProvider>
  );
}

export default App;
