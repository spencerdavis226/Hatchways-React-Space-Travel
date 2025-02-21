import { createContext, useState, useEffect } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';

const SpaceTravelContext = createContext();

export const SpaceTravelProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [planetsResponse, spacecraftsResponse] = await Promise.all([
          SpaceTravelApi.getPlanets(),
          SpaceTravelApi.getSpacecrafts(),
        ]);

        setPlanets(planetsResponse.data);
        setSpacecrafts(spacecraftsResponse.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <SpaceTravelContext.Provider
      value={{ planets, spacecrafts, setPlanets, setSpacecrafts, loading }}
    >
      {children}
    </SpaceTravelContext.Provider>
  );
};

export default SpaceTravelContext;
