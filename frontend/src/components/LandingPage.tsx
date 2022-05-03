import { MakeNewGameService } from "../client";
import { AppState } from "../utils";

type Props = {
  handleAppState: (appState: AppState) => void;
  handleUpdateGameIdSelectToken: (gameId: number) => void;
};

const LandingPage = (props: Props) => {
  async function handleNewGame() {
    await MakeNewGameService.makeNewGame()
      .then((data) => {
        props.handleUpdateGameIdSelectToken(data.game_id);
      })
      .catch(() => {
        props.handleAppState(AppState._Error);
      });
  }

  // resume game (set page to Resume)
  const handleResumeGame = () => {
    props.handleAppState(AppState._Resume);
  };

  return (
    <div className="landing-div">
      <button
        className="landing-button"
        data-testid="landing-button-one"
        onClick={handleNewGame}
      >
        New Game
      </button>
      <button
        className="landing-button"
        data-testid="landing-button-two"
        onClick={handleResumeGame}
      >
        Resume Game
      </button>
    </div>
  );
};

export default LandingPage;
