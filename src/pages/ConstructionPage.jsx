import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceTravelApi from '../services/SpaceTravelApi';
import BackButton from '../components/BackButton';
import Notification from '../components/Notification';
import SpaceTravelContext from '../context/SpaceTravelContext';
import styles from './ConstructionPage.module.css';

const ConstructionPage = () => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { setSpacecrafts } = useContext(SpaceTravelContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: ensure name is provided and capacity is positive
    if (!name.trim()) {
      setError('Please provide a spacecraft name.');
      return;
    }
    if (capacity <= 0) {
      setError('Capacity must be a positive number.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await SpaceTravelApi.buildSpacecraft({
        name,
        capacity,
        description,
        pictureUrl: null,
      });

      // If API didn't return data, fetch spacecrafts manually
      if (!response.data) {
        console.warn(
          'API did not return spacecraft data. Fetching manually...'
        );
        const updatedSpacecrafts = await SpaceTravelApi.getSpacecrafts();
        setSpacecrafts(updatedSpacecrafts.data);
      } else {
        setSpacecrafts((prev) => [...prev, response.data]);
      }

      navigate('/spacecrafts');
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.constructionPage}>
      <BackButton />
      <h1 className={styles.constructionPage__title}>
        Construct a New Spacecraft
      </h1>
      <Notification
        message={error}
        type="error"
        onClose={() => setError(null)}
      />
      <form onSubmit={handleSubmit} className={styles.constructionPage__form}>
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

        <label htmlFor="description" className={styles.constructionPage__label}>
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.constructionPage__textarea}
        />

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

export default ConstructionPage;
