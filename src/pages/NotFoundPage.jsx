import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.notFoundPage__title}>Page Not Found</h1>
      <p className={styles.notFoundPage__description}>
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className={styles.notFoundPage__link}>
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
