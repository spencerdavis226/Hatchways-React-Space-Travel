import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SpaceTravelContext from '../context/SpaceTravelContext';
import SpaceTravelApi from '../services/SpaceTravelApi';
import BackButton from '../components/BackButton';

const SpacecraftsPage = () => {
  const { spacecrafts, setSpacecrafts, loading } =
    useContext(SpaceTravelContext);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    console.log(`Attempting to delete spacecraft with ID: ${id}`);
    setDeletingId(id);

    try {
      const response = await SpaceTravelApi.destroySpacecraftById({ id });
      console.log('Delete API Response:', response);

      if (!response || response.isError) {
        console.error('Error: Deletion failed in API.');
        return;
      }

      setSpacecrafts((prev) => {
        const updatedList = prev.filter((craft) => craft.id !== id);
        console.log('Updated spacecrafts list after deletion:', updatedList);
        return [...updatedList];
      });

      console.log(`Spacecraft with ID: ${id} deleted successfully.`);
    } catch (err) {
      console.error('Failed to delete spacecraft:', err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <h2>Loading spacecraft...</h2>;

  return (
    <div>
      <BackButton />
      <h1>Spacecrafts</h1>
      {!spacecrafts || spacecrafts.length === 0 ? (
        <h2 style={{ color: 'red' }}>No spacecraft found.</h2>
      ) : (
        <ul>
          {spacecrafts.map((craft) => (
            <li key={craft.id}>
              <h3>
                <Link to={`/spacecrafts/${craft.id}`}>{craft.name}</Link>
              </h3>
              <p>Capacity: {craft.capacity}</p>
              <button
                onClick={() => handleDelete(craft.id)}
                disabled={deletingId === craft.id}
              >
                {deletingId === craft.id ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SpacecraftsPage;
