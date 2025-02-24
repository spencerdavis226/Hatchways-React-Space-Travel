import { Link } from 'react-router-dom'; // Import Link for navigation between routes
import styles from './HomePage.module.css'; // Import CSS module for styling the homepage

// HomePage component: displays the landing page of the app with navigation links.
const HomePage = () => {
  return (
    <div className={styles.homePage}>
      {' '}
      {/* Main container styled with CSS module */}
      <h1 className={styles.homePage__title}>
        🚀 Welcome to Space Travel
      </h1>{' '}
      {/* Page title with an icon */}
      <p className={styles.homePage__description}>
        Explore the universe by building, managing, and deploying spacecraft.
      </p>{' '}
      {/* Brief description of the app */}
      <nav className={styles.homePage__nav}>
        {' '}
        {/* Navigation container */}
        <ul className={styles.homePage__navList}>
          {' '}
          {/* List of navigation items */}
          <li className={styles.homePage__navItem}>
            <Link to="/spacecrafts" className={styles.homePage__navLink}>
              View Spacecraft
            </Link>{' '}
            {/* Link to view the list of spacecraft */}
          </li>
          <li className={styles.homePage__navItem}>
            <Link to="/construct" className={styles.homePage__navLink}>
              Construct a Spacecraft
            </Link>{' '}
            {/* Link to the spacecraft construction page */}
          </li>
          <li className={styles.homePage__navItem}>
            <Link to="/planets" className={styles.homePage__navLink}>
              Explore Planets
            </Link>{' '}
            {/* Link to explore available planets */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage; // Export the component for use in routing and other parts of the app
