import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SpaceTravelApi from '../services/SpaceTravelApi';
import BackButton from '../components/BackButton';

const SpacecraftDetailPage = () => {
  const { id } = useParams(); // Get the spacecraft ID from the URL
  const [spacecraft, setSpacecraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/spacecrafts');
  };

  useEffect(() => {
    // Fetch spacecraft details from the API
    async function fetchData() {
      try {
        const response = await SpaceTravelApi.getSpacecraftById({ id });
        if (response.isError) {
          setError('Failed to load spacecraft details.');
        } else {
          setSpacecraft(response.data);
        }
      } catch (err) {
        setError('An error occurred while fetching spacecraft details.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <h2>Loading spacecraft details...</h2>;
  if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;
  if (!spacecraft) return <h2>Spacecraft not found.</h2>;

  return (
    <div className="spacecraft-detail-page">
      <BackButton onClick={handleBackClick} />
      <article>
        <h1>{spacecraft.name}</h1>
        <p>
          <strong>Capacity:</strong> {spacecraft.capacity}
        </p>
        <p>
          <strong>Description:</strong> {spacecraft.description}
        </p>
        {spacecraft.pictureUrl && (
          <img src={spacecraft.pictureUrl} alt={spacecraft.name} />
        )}
      </article>
    </div>
  );
};

export default SpacecraftDetailPage;
