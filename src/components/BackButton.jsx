import { useNavigate } from 'react-router-dom';

const BackButton = ({ fallbackPath = '/' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <button onClick={handleBack} style={{ marginBottom: '10px' }}>
      ← Back
    </button>
  );
};

export default BackButton;
