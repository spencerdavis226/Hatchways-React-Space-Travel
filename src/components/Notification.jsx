import styles from './Notification.module.css'; // Import CSS modules for styling

// Notification component: displays a message with a style based on its type (error or success).
const Notification = ({ message, type, onClose }) => {
  // If no message is provided, do not render anything.
  if (!message) return null;

  // Conditionally select a CSS class depending on the notification type.
  const notificationClass =
    type === 'error' ? styles.notificationError : styles.notificationSuccess;

  // Render the notification with a close button that triggers onClose when clicked.
  return (
    <div className={`${styles.notification} ${notificationClass}`}>
      <strong className={styles.message}>{message}</strong>
      <button onClick={onClose} className={styles.closeButton}>
        ✖
      </button>
    </div>
  );
};

export default Notification; // Export for use in other parts of the app.
