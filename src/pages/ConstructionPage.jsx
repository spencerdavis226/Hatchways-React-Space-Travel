import { useState, useContext } from 'react'; // React hooks for managing state and context
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation
import SpaceTravelApi from '../services/SpaceTravelApi'; // API service for backend calls
import BackButton from '../components/BackButton'; // Component for navigating back
import Notification from '../components/Notification'; // Component for displaying notifications
import SpaceTravelContext from '../context/SpaceTravelContext'; // Context to share spacecraft data across components
import styles from './ConstructionPage.module.css'; // CSS module for styling the component

// ConstructionPage component: provides a form to create a new spacecraft.
const ConstructionPage = () => {
  // State variables for form inputs and UI state
  const [name, setName] = useState(''); // Spacecraft name
  const [capacity, setCapacity] = useState(1); // Spacecraft capacity (default to 1)
  const [description, setDescription] = useState(''); // Spacecraft description
  const [error, setError] = useState(null); // Error message state
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks form submission status

  // Hooks for navigation and accessing context
  const navigate = useNavigate(); // For redirecting after form submission
  const { setSpacecrafts } = useContext(SpaceTravelContext); // Update the shared spacecraft list

  // handleSubmit: manages form submission to create a new spacecraft.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation: name must not be empty and capacity must be positive
    if (!name.trim()) {
      setError('Please provide a spacecraft name.');
      return;
    }
    if (capacity <= 0) {
      setError('Capacity must be a positive number.');
      return;
    }

    setIsSubmitting(true); // Indicate the form is submitting
    setError(null); // Clear any previous error

    try {
      // Attempt to build a new spacecraft via API
      const response = await SpaceTravelApi.buildSpacecraft({
        name,
        capacity,
        description,
        pictureUrl: null, // No picture provided
      });

      // If the API does not return spacecraft data, fetch the updated list manually
      if (!response.data) {
        console.warn(
          'API did not return spacecraft data. Fetching manually...'
        );
        const updatedSpacecrafts = await SpaceTravelApi.getSpacecrafts();
        setSpacecrafts(updatedSpacecrafts.data);
      } else {
        // Append the newly created spacecraft to the existing list
        setSpacecrafts((prev) => [...prev, response.data]);
      }

      // Navigate to the spacecrafts overview page after successful creation
      navigate('/spacecrafts');
    } catch (err) {
      // Set an error message if something goes wrong during the API call
      setError(err.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false); // Reset submission state regardless of success or failure
    }
  };

  return (
    <div className={styles.constructionPage}>
      <BackButton /> {/* Render back button for navigation */}
      <h1 className={styles.constructionPage__title}>
        Construct a New Spacecraft
      </h1>
      {/* Display error notification if there is an error */}
      <Notification
        message={error}
        type="error"
        onClose={() => setError(null)}
      />
      {/* Form for spacecraft creation */}
      <form onSubmit={handleSubmit} className={styles.constructionPage__form}>
        {/* Spacecraft name input */}
        <label htmlFor="name" className={styles.constructionPage__label}>
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.constructionPage__input}
        />

        {/* Spacecraft capacity input */}
        <label htmlFor="capacity" className={styles.constructionPage__label}>
          Capacity:
        </label>
        <input
          id="capacity"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
          className={styles.constructionPage__input}
        />

        {/* Spacecraft description input */}
        <label htmlFor="description" className={styles.constructionPage__label}>
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.constructionPage__textarea}
        />

        {/* Submit button: displays loading text when submitting */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.constructionPage__submitButton}
        >
          {isSubmitting ? 'Creating...' : 'Create Spacecraft'}
        </button>
      </form>
    </div>
  );
};

export default ConstructionPage; // Export the component for use in routing
