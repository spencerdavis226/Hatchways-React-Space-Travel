import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SpaceTravelContext from '../context/SpaceTravelContext';
import SpaceTravelApi from '../services/SpaceTravelApi';
import BackButton from '../components/BackButton';
import styles from './SpacecraftsPage.module.css';

const SpacecraftsPage = () => {
  const { spacecrafts, setSpacecrafts, loading } =
    useContext(SpaceTravelContext);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const response = await SpaceTravelApi.destroySpacecraftById({ id });
      if (!response || response.isError) {
        // Optionally handle the error here (e.g., set an error state)
        return;
      }
      setSpacecrafts((prev) => prev.filter((craft) => craft.id !== id));
    } catch (err) {
      // Optionally display an error message
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <h2>Loading spacecraft...</h2>;

  return (
    <div className={styles.spacecraftsPage}>
      <BackButton />
      <h1 className={styles.spacecraftsPage__title}>Spacecrafts</h1>
      {!spacecrafts || spacecrafts.length === 0 ? (
        <h2 className={styles.spacecraftsPage__noData}>No spacecraft found.</h2>
      ) : (
        <ul className={styles.spacecraftsPage__list}>
          {spacecrafts.map((craft) => (
            <li key={craft.id} className={styles.spacecraftsPage__item}>
              <h3>
                <Link
                  to={`/spacecrafts/${craft.id}`}
                  className={styles.spacecraftsPage__link}
                >
                  {craft.name}
                </Link>
              </h3>
              <p>Capacity: {craft.capacity}</p>
              <button
                onClick={() => handleDelete(craft.id)}
                disabled={deletingId === craft.id}
                className={styles.spacecraftsPage__deleteButton}
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
