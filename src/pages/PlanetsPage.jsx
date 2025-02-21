import { useState, useContext } from 'react';
import SpaceTravelContext from '../context/SpaceTravelContext';
import SpaceTravelApi from '../services/SpaceTravelApi';
import BackButton from '../components/BackButton';

const PlanetsPage = () => {
  const [selectedTransfers, setSelectedTransfers] = useState({});
  const [loadingTransfers, setLoadingTransfers] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { planets, spacecrafts, loading, setPlanets, setSpacecrafts } =
    useContext(SpaceTravelContext);

  const handleSelectPlanet = (spacecraftId, targetPlanetId) => {
    setSelectedTransfers((prev) => ({
      ...prev,
      [spacecraftId]: targetPlanetId,
    }));
  };

  const handleSendSpacecraft = async (spacecraftId) => {
    if (selectedTransfers[spacecraftId] == null) return; // No planet selected
    setLoadingTransfers((prev) => ({ ...prev, [spacecraftId]: true }));

    try {
      const response = await SpaceTravelApi.sendSpacecraftToPlanet({
        spacecraftId,
        targetPlanetId: selectedTransfers[spacecraftId],
      });

      if (response.isError) {
        throw new Error(response.data);
      }

      const updatedPlanets = await SpaceTravelApi.getPlanets();
      if (updatedPlanets.isError) {
        throw new Error('Failed to refresh planets');
      }
      setPlanets(updatedPlanets.data);

      const updatedSpacecrafts = await SpaceTravelApi.getSpacecrafts();
      if (updatedSpacecrafts.isError) {
        throw new Error('Failed to refresh spacecrafts');
      }
      setSpacecrafts(updatedSpacecrafts.data);

      setSuccessMessage('Spacecraft successfully transferred!');
    } catch (err) {
      setErrorMessage(
        err.message || 'Failed to send spacecraft. Please try again.'
      );
    } finally {
      setLoadingTransfers((prev) => ({ ...prev, [spacecraftId]: false }));
    }
  };

  if (loading) return <h2>Loading planets...</h2>;
  if (!planets || planets.length === 0)
    return <h2 style={{ color: 'red' }}>No planets found.</h2>;

  return (
    <div>
      <BackButton />
      <h1>Planets</h1>
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
      <ul>
        {planets.map((planet) => (
          <li key={planet.id}>
            <h3>{planet.name}</h3>
            <p>Population: {planet.currentPopulation}</p>
            <h4>Stationed Spacecraft:</h4>
            <ul>
              {spacecrafts
                .filter((craft) => craft.currentLocation === planet.id)
                .map((craft) => (
                  <li key={craft.id}>
                    {craft.name} (Capacity: {craft.capacity})
                    <select
                      value={selectedTransfers[craft.id] ?? ''}
                      onChange={(e) =>
                        handleSelectPlanet(craft.id, Number(e.target.value))
                      }
                    >
                      <option value="">Select a destination</option>
                      {planets
                        .filter((p) => p.id !== planet.id) // Exclude current planet
                        .map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                    </select>
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

export default PlanetsPage;
