import { useState, useEffect } from 'react'; // Import hooks for state and side effects
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks for accessing URL parameters and navigation
import SpaceTravelApi from '../services/SpaceTravelApi'; // Import API service for fetching spacecraft data
import BackButton from '../components/BackButton'; // Import BackButton component for navigation
import styles from './SpacecraftDetailPage.module.css'; // Import CSS module for component styling

// SpacecraftDetailPage component: displays detailed information about a specific spacecraft.
const SpacecraftDetailPage = () => {
  const { id } = useParams(); // Extract the spacecraft ID from the URL parameters
  const [spacecraft, setSpacecraft] = useState(null); // State to store the fetched spacecraft data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to store error messages

  const navigate = useNavigate(); // Initialize navigation hook

  // Handler function for the back button click; navigates back to the spacecrafts list.
  const handleBackClick = () => {
    navigate('/spacecrafts');
  };

  // useEffect to fetch spacecraft details when the component mounts or when 'id' changes.
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the spacecraft details by ID using the API service.
        const response = await SpaceTravelApi.getSpacecraftById({ id });
        // Check if the API returned an error.
        if (response.isError) {
          setError('Failed to load spacecraft details.');
        } else {
          // Update state with the fetched spacecraft data.
          setSpacecraft(response.data);
        }
      } catch (err) {
        // Catch any errors during the API call and update the error state.
        setError('An error occurred while fetching spacecraft details.');
      } finally {
        // Set loading to false once the API call is complete.
        setLoading(false);
      }
    }
    fetchData();
  }, [id]); // Dependency array: re-run effect if the 'id' parameter changes

  // Display a loading message while fetching data.
  if (loading) return <h2>Loading spacecraft details...</h2>;
  // Display an error message if there was a problem fetching data.
  if (error) return <h2 className={styles.error}>{error}</h2>;
  // Display a "not found" message if no spacecraft data is available.
  if (!spacecraft)
    return <h2 className={styles.error}>Spacecraft not found.</h2>;

  // Render the spacecraft details once data has been successfully fetched.
  return (
    <div className={styles.spacecraftDetailPage}>
      <BackButton onClick={handleBackClick} />{' '}
      {/* Back button to return to spacecraft list */}
      <article>
        <h1 className={styles.spacecraftDetailPage__title}>
          {spacecraft.name}
        </h1>{' '}
        {/* Display spacecraft name */}
        <p className={styles.spacecraftDetailPage__info}>
          <strong>Capacity:</strong> {spacecraft.capacity}
        </p>{' '}
        {/* Display spacecraft capacity */}
        <p className={styles.spacecraftDetailPage__info}>
          <strong>Description:</strong> {spacecraft.description}
        </p>{' '}
        {/* Display spacecraft description */}
        {spacecraft.pictureUrl && (
          <img
            src={spacecraft.pictureUrl}
            alt={spacecraft.name}
            className={styles.spacecraftDetailPage__image}
          />
        )}{' '}
        {/* Conditionally render the spacecraft image if a URL is provided */}
      </article>
    </div>
  );
};

export default SpacecraftDetailPage; // Export the component for use in routing
