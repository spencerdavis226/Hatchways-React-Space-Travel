import { Link } from 'react-router-dom'; // Import Link for navigation between routes
import styles from './NotFoundPage.module.css'; // Import CSS module for styling the NotFoundPage

// NotFoundPage component: displays a message when a user navigates to a non-existent route.
const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      {' '}
      {/* Main container styled using CSS modules */}
      <h1 className={styles.notFoundPage__title}>Page Not Found</h1>{' '}
      {/* Title indicating the page is not found */}
      <p className={styles.notFoundPage__description}>
        Oops! The page you’re looking for doesn’t exist.
      </p>{' '}
      {/* Description providing additional context to the user */}
      <Link to="/" className={styles.notFoundPage__link}>
        Go back home
      </Link>{' '}
      {/* Navigation link to return to the homepage */}
    </div>
  );
};

export default NotFoundPage; // Export the component for use in routing
