import { useContext, useState } from 'react'; // Import hooks for accessing context and managing local state
import { Link } from 'react-router-dom'; // Import Link for navigation to other routes
import SpaceTravelContext from '../context/SpaceTravelContext'; // Import the global context containing spacecraft data
import SpaceTravelApi from '../services/SpaceTravelApi'; // Import API service for spacecraft operations
import BackButton from '../components/BackButton'; // Import a component that navigates back to the previous page
import styles from './SpacecraftsPage.module.css'; // Import CSS module for styling this page

const SpacecraftsPage = () => {
  // Destructure spacecraft data, setter, and loading status from the global context
  const { spacecrafts, setSpacecrafts, loading } =
    useContext(SpaceTravelContext);
  // Local state to track the id of a spacecraft currently being deleted (to show a loading indicator on the button)
  const [deletingId, setDeletingId] = useState(null);

  // Function to handle deletion of a spacecraft by its id
  const handleDelete = async (id) => {
    setDeletingId(id); // Set the spacecraft id that's currently being deleted
    try {
      // Attempt to delete the spacecraft via the API
      const response = await SpaceTravelApi.destroySpacecraftById({ id });
      if (!response || response.isError) {
        // Optionally, handle errors here (e.g., set an error state or display a message)
        return;
      }
      // Update the spacecraft list by filtering out the deleted spacecraft
      setSpacecrafts((prev) => prev.filter((craft) => craft.id !== id));
    } catch (err) {
      // Optionally, display an error message if the deletion fails
    } finally {
      setDeletingId(null); // Reset the deleting state regardless of success or failure
    }
  };

  // If the data is still loading, display a loading message
  if (loading) return <h2>Loading spacecraft...</h2>;

  return (
    <div className={styles.spacecraftsPage}>
      <BackButton /> {/* Render the back button for navigation */}
      <h1 className={styles.spacecraftsPage__title}>Spacecrafts</h1>
      {/* Conditionally render content: show a message if no spacecraft exists, else list them */}
      {!spacecrafts || spacecrafts.length === 0 ? (
        <h2 className={styles.spacecraftsPage__noData}>No spacecraft found.</h2>
      ) : (
        <ul className={styles.spacecraftsPage__list}>
          {spacecrafts.map((craft) => (
            <li key={craft.id} className={styles.spacecraftsPage__item}>
              <h3>
                {/* Link to the detail page for each spacecraft */}
                <Link
                  to={`/spacecrafts/${craft.id}`}
                  className={styles.spacecraftsPage__link}
                >
                  {craft.name}
                </Link>
              </h3>
              <p>Capacity: {craft.capacity}</p>
              {/* Delete button: shows 'Deleting...' while deletion is in progress */}
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

export default SpacecraftsPage; // Export the component for use in the app's routing
