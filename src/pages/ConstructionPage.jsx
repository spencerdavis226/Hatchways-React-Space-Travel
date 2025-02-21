import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceTravelApi from '../services/SpaceTravelApi';

const ConstructionPage = () => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh

    // Ensure all fields are filled before submission
    if (!name || !capacity || !description) {
      setError('All fields are required!');
      return;
    }

    try {
      const response = await SpaceTravelApi.buildSpacecraft({
        name,
        capacity,
        description,
        pictureUrl: null,
      });

      if (!response.data) {
        // If the API didn't return data, fetch spacecrafts manually
        const updatedSpacecrafts = await SpaceTravelApi.getSpacecrafts();

        if (updatedSpacecrafts.data.length > 0) {
          navigate('/spacecrafts'); // Redirect if new data exists
        } else {
          setError('Spacecraft creation failed. Please try again.');
        }
      } else {
        navigate('/spacecrafts'); // Successful creation
      }
    } catch (err) {
      setError('An error occurred while creating the spacecraft.');
    }
  };

  return (
    <div>
      <h1>Construct a New Spacecraft</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Capacity:
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
        </label>

        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button type="submit">Create Spacecraft</button>
      </form>
    </div>
  );
};

export default ConstructionPage;
