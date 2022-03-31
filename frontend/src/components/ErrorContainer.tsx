const ErrorContainer = () => {
  return (
    <div className="errors">
      <h4 className="error-heading">
        The API is down - please wait or try again later.
      </h4>
      <button
        className="try-again-button"
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorContainer;
