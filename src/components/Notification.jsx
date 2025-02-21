import styles from './Notification.module.css';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  // Use different classes based on the type of notification
  const notificationClass =
    type === 'error' ? styles.notificationError : styles.notificationSuccess;

  return (
    <div className={`${styles.notification} ${notificationClass}`}>
      <strong className={styles.message}>{message}</strong>
      <button onClick={onClose} className={styles.closeButton}>
        ✖
      </button>
    </div>
  );
};

export default Notification;
