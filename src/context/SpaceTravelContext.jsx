import { createContext, useState, useEffect } from 'react'; // Import React utilities
import SpaceTravelApi from '../services/SpaceTravelApi'; // Import custom API service

// Create a context to hold shared state and functionality.
const SpaceTravelContext = createContext();

// Provider component: wraps children and supplies them with shared data via context.
export const SpaceTravelProvider = ({ children }) => {
  // States to hold planets, spacecrafts, and a loading indicator.
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  // On mount, fetch data for planets and spacecrafts in parallel.
  useEffect(() => {
    async function fetchData() {
      try {
        const [planetsResponse, spacecraftsResponse] = await Promise.all([
          SpaceTravelApi.getPlanets(),
          SpaceTravelApi.getSpacecrafts(),
        ]);
        // Update state with fetched data.
        setPlanets(planetsResponse.data);
        setSpacecrafts(spacecraftsResponse.data);
      } catch (err) {
        // Handle errors if needed (e.g., log or display a message).
      } finally {
        // Whether success or error, stop the loading indicator.
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Provide the state and setters to all children via context.
  return (
    <SpaceTravelContext.Provider
      value={{ planets, spacecrafts, setPlanets, setSpacecrafts, loading }}
    >
      {children}
    </SpaceTravelContext.Provider>
  );
};

export default SpaceTravelContext; // Export the context for use in other components.
