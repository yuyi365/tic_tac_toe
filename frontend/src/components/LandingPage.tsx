type Props = {
  handleNewGame: () => void;
  handleResumeGame: () => void;
};

const LandingPage = (props: Props) => {
  return (
    <div className="landing-div">
      <button
        className="landing-button"
        data-testid="landing-button-one"
        onClick={props.handleNewGame}
      >
        New Game
      </button>
      <button
        className="landing-button"
        data-testid="landing-button-two"
        onClick={props.handleResumeGame}
      >
        Resume Game
      </button>
    </div>
  );
};

export default LandingPage;
