import { MakeNewGameService } from "../client";
import { AppState } from "../appStates";

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
        props.handleAppState(AppState.Error);
      });
  }

  // resume game (set page to Resume)
  const handleResumeGame = () => {
    props.handleAppState(AppState.Resume);
  };

  return (
    <div className="landing-div" data-testid="landing-div">
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
