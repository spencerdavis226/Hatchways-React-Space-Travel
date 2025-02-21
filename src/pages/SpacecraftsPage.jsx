import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SpaceTravelApi from '../services/SpaceTravelApi';

const SpacecraftsPage = () => {
  const [spacecrafts, setSpacecrafts] = useState([]); // Stores spacecraft data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Tracks API errors
  const [deletingId, setDeletingId] = useState(null); // Tracks which spacecraft is being deleted

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

  const handleDelete = async (id) => {
    setDeletingId(id); // Sets the current spacecraft as deleting
    try {
      await SpaceTravelApi.destroySpacecraftById({ id });

      setSpacecrafts((prev) => prev.filter((craft) => craft.id !== id));
    } catch (err) {
      console.error('Failed to delete spacecraft:', err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <h2>Loading spacecraft...</h2>;
  if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;

  return (
    <div>
      <h1>Spacecrafts</h1>
      <ul>
        {spacecrafts.map((craft) => (
          <li key={craft.id}>
            <h3>
              <Link to={`/spacecrafts/${craft.id}`}>{craft.name}</Link>
            </h3>
            <p>Capacity: {craft.capacity}</p>
            <button
              onClick={() => handleDelete(craft.id)}
              disabled={deletingId === craft.id} // Disable button if craft is being deleted
            >
              {deletingId === craft.id ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpacecraftsPage;
