import TokenSelection from "./TokenSelection";
import { useState } from "react";
import { MakeSettingsService, Player } from "../client";
import { AppState } from "../appStates";

type Props = {
  handleAppState: (appState: AppState) => void;
  gameId: number;
};

const TokenSelectionContainer = (props: Props) => {
  const [playerOneToken, setPlayerOneToken] = useState("");
  const [playerTwoToken, setPlayerTwoToken] = useState("");
  const players = [Player._1, Player._2];
  const tokens = ["🦄", "🍄", "👑", "🦩"];

  async function handleSettingsSetup() {
    await MakeSettingsService.makeSettings(props.gameId, {
      player_one_token: playerOneToken,
      player_two_token: playerTwoToken,
    })
      .then(() => {
        props.handleAppState(AppState.Board);
      })
      .catch(() => {
        props.handleAppState(AppState.Error);
      });
  }

  const setSubmitButton = () => {
    if (playerOneToken !== "" && playerTwoToken != "") {
      return "token-complete-button";
    } else {
      return "token-incomplete-button";
    }
  };

  const mapPlayers = players.map((player) => {
    const filterTokensOne = tokens.filter((token) => token !== playerTwoToken);

    const filterTokensTwo = tokens.filter((token) => token !== playerOneToken);

    return (
      <TokenSelection
        key={player}
        player={player}
        setPlayerToken={
          player === Player._1 ? setPlayerOneToken : setPlayerTwoToken
        }
        tokens={player === Player._1 ? filterTokensOne : filterTokensTwo}
      />
    );
  });
  return (
    <>
      <div className="token-div" data-testid="token-div">
        {mapPlayers}
      </div>
      <div>
        <button
          className={setSubmitButton()}
          data-testid="token-complete-button"
          onClick={handleSettingsSetup}
        >
          Start
        </button>
      </div>
    </>
  );
};

export default TokenSelectionContainer;
