import { useState, useEffect } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';

const SpacecraftsPage = () => {
  const [spacecrafts, setSpacecrafts] = useState([]); // Stores spacecraft data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Tracks API errors

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await SpaceTravelApi.getSpacecrafts();
        if (response.isError) {
          setError('Failed to load spacecraft.');
        } else {
          setSpacecrafts(response.data);
        }
      } catch (err) {
        setError('Failed to load spacecraft.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <h2>Loading spacecraft...</h2>;
  if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;

  return (
    <div>
      <h1>Spacecrafts</h1>
      <ul>
        {spacecrafts.map((craft) => (
          <li key={craft.id}>
            <h3>{craft.name}</h3>
            <p>Capacity: {craft.capacity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpacecraftsPage;
