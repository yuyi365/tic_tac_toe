import { useState } from "react";

type Props = {
  handleUpdateGameIdGetBoard: (gameId: any) => void;
};
const ResumeGame = (props: Props) => {
  const [gameIdInput, setGameIdInput] = useState("");

  const handleResumeGameSubmission = (e: any) => {
    e.preventDefault();
    props.handleUpdateGameIdGetBoard(gameIdInput);
  };

  return (
    <div className="form-div" data-testid="resume-game-div">
      <form className="form" data-testid="resume-game-form">
        <label id="input-id">Please input your game id:</label>
        <input
          type="text"
          id="game-id-input"
          name="game-id"
          required
          maxLength={4}
          onChange={(e) => setGameIdInput(e.target.value)}
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
