type Props = {
  gameId: number;
  setGameId: (gameId: string) => void;
  findGame: (gameId: number) => void;
};
const ResumeGame = (props: Props) => {
  const handleResumeGameSubmission = (e: any) => {
    e.preventDefault();
    props.findGame(props.gameId);
  };

  return (
    <div className="form-div">
      <form className="form" data-testid="resume-game-form">
        <label id="input-id">Please input your game id:</label>
        <input
          type="text"
          id="game-id-input"
          name="game-id"
          required
          maxLength={4}
          onChange={(e) => props.setGameId(e.target.value)}
        />
        <button
          onClick={(e) => handleResumeGameSubmission(e)}
          className="pin-complete-button"
          data-testid="pin-complete-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResumeGame;
