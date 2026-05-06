const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <p style={{ color: 'var(--red)', margin: '1rem 0' }}>{message}</p>;
};

export default ErrorMessage;