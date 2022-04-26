type Props = {
  handleNewGame: () => void;
  handleResumeGame: () => void;
};

const LandingPage = (props: Props) => {
  return (
    <div className="landing-div">
      <button className="landing-button" onClick={props.handleNewGame}>
        New Game
      </button>
      <button className="landing-button" onClick={props.handleResumeGame}>
        Resume Game
      </button>
    </div>
  );
};

export default LandingPage;
