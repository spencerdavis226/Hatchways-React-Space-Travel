import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SpaceTravelApi from '../services/SpaceTravelApi';
import BackButton from '../components/BackButton';
import styles from './SpacecraftDetailPage.module.css';

const SpacecraftDetailPage = () => {
  const { id } = useParams();
  const [spacecraft, setSpacecraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/spacecrafts');
  };

  useEffect(() => {
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
  if (error) return <h2 className={styles.error}>{error}</h2>;
  if (!spacecraft)
    return <h2 className={styles.error}>Spacecraft not found.</h2>;

  return (
    <div className={styles.spacecraftDetailPage}>
      <BackButton onClick={handleBackClick} />
      <article>
        <h1 className={styles.spacecraftDetailPage__title}>
          {spacecraft.name}
        </h1>
        <p className={styles.spacecraftDetailPage__info}>
          <strong>Capacity:</strong> {spacecraft.capacity}
        </p>
        <p className={styles.spacecraftDetailPage__info}>
          <strong>Description:</strong> {spacecraft.description}
        </p>
        {spacecraft.pictureUrl && (
          <img
            src={spacecraft.pictureUrl}
            alt={spacecraft.name}
            className={styles.spacecraftDetailPage__image}
          />
        )}
      </article>
    </div>
  );
};

export default SpacecraftDetailPage;
