import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <h1 className={styles.homePage__title}>🚀 Welcome to Space Travel</h1>
      <p className={styles.homePage__description}>
        Explore the universe by building, managing, and deploying spacecraft.
      </p>

      <nav className={styles.homePage__nav}>
        <ul className={styles.homePage__navList}>
          <li className={styles.homePage__navItem}>
            <Link to="/spacecrafts" className={styles.homePage__navLink}>
              View Spacecraft
            </Link>
          </li>
          <li className={styles.homePage__navItem}>
            <Link to="/construct" className={styles.homePage__navLink}>
              Construct a Spacecraft
            </Link>
          </li>
          <li className={styles.homePage__navItem}>
            <Link to="/planets" className={styles.homePage__navLink}>
              Explore Planets
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
