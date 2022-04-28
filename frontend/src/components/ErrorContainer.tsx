const ErrorContainer = () => {
  const handleClick = () => {
    window.location.reload();
  };
  return (
    <div className="errors" data-testid="error-container">
      <h4 className="error-heading">
        There was an error - please try again later.
      </h4>
      <button
        className="try-again-button"
        data-testid="try-again-button"
        onClick={handleClick}
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorContainer;
