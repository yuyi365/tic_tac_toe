import { useState } from "react";

type Props = {
  pin: string;
  setPin: (pin: string | ((pin: string) => string)) => void;
  gameId: number;
  setGameId: (gameId: any | ((gameId: any) => any)) => void;
};
const ResumePin = (props: Props) => {
  const [notFoundError, setNotFoundError] = useState(false);

  const handleResumeGameSubmission = (e: any) => {
    e.preventDefault();
    
    // query backend for game_id
    // if game_id is found, change boardcontainer to true, else: pop-up game does not exst
  };

  return (
    <div className="form-div">
      <form className="form">
        <label>Please input your game id:</label>
        <input
          type="text"
          id="game-id-input"
          name="game-id"
          required
          maxLength={4}
          onChange={(e) => props.setGameId(e.target.value)}
        />
        <label>Please input your four (4) digit game pin:</label>
        <input
          type="text"
          id="pin-input"
          name="pin"
          required
          maxLength={4}
          onChange={(e) => props.setPin(e.target.value)}
        />
        <button
          onClick={(e) => handleResumeGameSubmission(e)}
          className="pin-complete-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResumePin;
