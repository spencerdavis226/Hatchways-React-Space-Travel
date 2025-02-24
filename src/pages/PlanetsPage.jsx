import { useState, useContext } from 'react'; // Import hooks for state management and context access
import SpaceTravelContext from '../context/SpaceTravelContext'; // Import global context for planets and spacecrafts
import SpaceTravelApi from '../services/SpaceTravelApi'; // Import API functions for interacting with backend services
import BackButton from '../components/BackButton'; // Import BackButton component for navigation
import styles from './PlanetsPage.module.css'; // Import CSS module for styling

// PlanetsPage component: displays a list of planets and allows transferring spacecraft between them.
const PlanetsPage = () => {
  // State to track selected destination for each spacecraft transfer.
  const [selectedTransfers, setSelectedTransfers] = useState({});
  // State to track loading status for each spacecraft transfer action.
  const [loadingTransfers, setLoadingTransfers] = useState({});
  // State to display a success message after a successful transfer.
  const [successMessage, setSuccessMessage] = useState(null);
  // State to display an error message when a transfer fails.
  const [errorMessage, setErrorMessage] = useState(null);

  // Access planets, spacecrafts, and loading state from the global context,
  // along with setters to update them.
  const { planets, spacecrafts, loading, setPlanets, setSpacecrafts } =
    useContext(SpaceTravelContext);

  // Updates the selected transfer destination for a given spacecraft.
  const handleSelectPlanet = (spacecraftId, targetPlanetId) => {
    setSelectedTransfers((prev) => ({
      ...prev,
      [spacecraftId]: targetPlanetId,
    }));
  };

  // Sends a spacecraft to its selected destination planet.
  const handleSendSpacecraft = async (spacecraftId) => {
    // Return early if no destination is selected.
    if (selectedTransfers[spacecraftId] == null) return;
    // Set the loading state for this spacecraft transfer.
    setLoadingTransfers((prev) => ({ ...prev, [spacecraftId]: true }));

    try {
      // Attempt to transfer the spacecraft via the API.
      const response = await SpaceTravelApi.sendSpacecraftToPlanet({
        spacecraftId,
        targetPlanetId: selectedTransfers[spacecraftId],
      });

      // If API indicates an error, throw it to be caught below.
      if (response.isError) {
        throw new Error(response.data);
      }

      // Refresh the list of planets.
      const updatedPlanets = await SpaceTravelApi.getPlanets();
      if (updatedPlanets.isError) {
        throw new Error('Failed to refresh planets');
      }
      setPlanets(updatedPlanets.data);

      // Refresh the list of spacecrafts.
      const updatedSpacecrafts = await SpaceTravelApi.getSpacecrafts();
      if (updatedSpacecrafts.isError) {
        throw new Error('Failed to refresh spacecrafts');
      }
      setSpacecrafts(updatedSpacecrafts.data);

      // Set a success message on successful transfer.
      setSuccessMessage('Spacecraft successfully transferred!');
    } catch (err) {
      // If an error occurs, display an error message.
      setErrorMessage(
        err.message || 'Failed to send spacecraft. Please try again.'
      );
    } finally {
      // Reset the loading state for this spacecraft.
      setLoadingTransfers((prev) => ({ ...prev, [spacecraftId]: false }));
    }
  };

  // Display a loading message if the global data is still loading.
  if (loading) return <h2>Loading planets...</h2>;
  // Display an error message if no planets are found.
  if (!planets || planets.length === 0)
    return <h2 style={{ color: 'red' }}>No planets found.</h2>;

  return (
    <div className={styles.planetsPage}>
      {' '}
      {/* Main container for the planets page */}
      <BackButton /> {/* Renders a button to navigate back */}
      <h1 className={styles.planetsPage__title}>Planets</h1>
      {/* Display success message if present */}
      {successMessage && (
        <div
          style={{
            background: 'lightgreen',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <strong>{successMessage}</strong>
          <button
            onClick={() => setSuccessMessage(null)}
            style={{ marginLeft: '10px' }}
          >
            ✖
          </button>
        </div>
      )}
      {/* Display error message if present */}
      {errorMessage && (
        <div
          style={{
            background: 'lightcoral',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <strong>{errorMessage}</strong>
          <button
            onClick={() => setErrorMessage(null)}
            style={{ marginLeft: '10px' }}
          >
            ✖
          </button>
        </div>
      )}
      {/* List of planets */}
      <ul className={styles.planetsPage__planetList}>
        {planets.map((planet) => (
          <li key={planet.id} className={styles.planetsPage__planetItem}>
            <h3>{planet.name}</h3>
            <p>Population: {planet.currentPopulation}</p>
            <h4>Stationed Spacecraft:</h4>
            {/* List spacecraft stationed on this planet */}
            <ul className={styles.planetsPage__spacecraftList}>
              {spacecrafts
                .filter((craft) => craft.currentLocation === planet.id)
                .map((craft) => (
                  <li key={craft.id}>
                    {craft.name} (Capacity: {craft.capacity})
                    {/* Dropdown to select a destination planet for transfer */}
                    <select
                      value={selectedTransfers[craft.id] ?? ''}
                      onChange={(e) =>
                        handleSelectPlanet(craft.id, Number(e.target.value))
                      }
                    >
                      <option value="">Select a destination</option>
                      {planets
                        .filter((p) => p.id !== planet.id) // Exclude the current planet
                        .map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                    </select>
                    {/* Button to initiate the transfer; disabled if no destination is selected or if transfer is loading */}
                    <button
                      onClick={() => handleSendSpacecraft(craft.id)}
                      disabled={
                        selectedTransfers[craft.id] == null ||
                        loadingTransfers[craft.id]
                      }
                    >
                      {loadingTransfers[craft.id] ? 'Sending...' : 'Send'}
                    </button>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanetsPage; // Export the component for use in the app's routing
