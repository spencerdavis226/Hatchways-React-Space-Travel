import { useState, useEffect } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';

const PlanetsPage = () => {
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [selectedTransfers, setSelectedTransfers] = useState({});
  const [loadingTransfers, setLoadingTransfers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlanets() {
      try {
        const [planetsResponse, spacecraftsResponse] = await Promise.all([
          SpaceTravelApi.getPlanets(),
          SpaceTravelApi.getSpacecrafts(),
        ]);

        if (planetsResponse.isError || spacecraftsResponse.isError) {
          setError('Failed to load data.');
        } else {
          setPlanets(planetsResponse.data);
          setSpacecrafts(spacecraftsResponse.data);
        }
      } catch (err) {
        setError('An error occured while fetching data.');
      } finally {
        setLoading(false);
      }
    }
    fetchPlanets();
  }, []);

  const handleSelectPlanet = (spacecraftId, targetPlanetId) => {
    setSelectedTransfers((prev) => ({
      ...prev,
      [spacecraftId]: targetPlanetId,
    }));
  };

  const handleSendSpacecraft = async (spacecraftId) => {
    if (!selectedTransfers[spacecraftId]) return; // No planet selected

    setLoadingTransfers((prev) => ({ ...prev, [spacecraftId]: true }));

    try {
      await SpaceTravelApi.sendSpacecraftToPlanet({
        spacecraftId,
        targetPlanetId: selectedTransfers[spacecraftId],
      });

      // Refetch data to update UI
      const updatedPlanets = await SpaceTravelApi.getPlanets();
      const updatedSpacecrafts = await SpaceTravelApi.getSpacecrafts();
      setPlanets(updatedPlanets.data);
      setSpacecrafts(updatedSpacecrafts.data);
    } catch (err) {
      console.error('Failed to send spacecraft:, err');
    } finally {
      setLoadingTransfers((prev) => ({ ...prev, [spacecraftId]: false }));
    }
  };

  if (loading) return <h2>Loading planets...</h2>;
  if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;

  return (
    <div>
      <h1>Planets</h1>
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
                      value={selectedTransfers[craft.id] || ''}
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
                        !selectedTransfers[craft.id] ||
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
