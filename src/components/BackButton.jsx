import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';

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
    <button onClick={handleBack} className={styles.backButton}>
      ← Back
    </button>
  );
};

export default BackButton;
