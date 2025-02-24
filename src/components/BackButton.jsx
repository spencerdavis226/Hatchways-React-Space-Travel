import { useNavigate } from 'react-router-dom'; // Import the hook for programmatic navigation
import styles from './BackButton.module.css'; // Import the CSS module for styling

// BackButton component: renders a button that navigates back or to a fallback route.
const BackButton = ({ fallbackPath = '/' }) => {
  // Initialize the navigate function from react-router-dom.
  const navigate = useNavigate();

  // Function to handle the back navigation logic.
  const handleBack = () => {
    // If there's enough history, go back one step.
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      // Otherwise, navigate to the fallback path.
      navigate(fallbackPath);
    }
  };

  // Render the back button with an onClick event that triggers handleBack.
  return (
    <button onClick={handleBack} className={styles.backButton}>
      ← Back
    </button>
  );
};

export default BackButton; // Export the component for use in other parts of the app.
