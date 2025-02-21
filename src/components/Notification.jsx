const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div
      style={{
        background: type === 'error' ? 'lightcoral' : 'lightgreen',
        padding: '10px',
        marginBottom: '10px',
      }}
    >
      <strong>{message}</strong>
      <button onClick={onClose} style={{ marginLeft: '10px' }}>
        ✖
      </button>
    </div>
  );
};

export default Notification;
