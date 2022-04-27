import TokenSelection from "./TokenSelection";

type Props = {
  handleStartGame: () => void;
  setPlayerOneToken: (playerOneToken: string) => void;
  setPlayerTwoToken: (playerTwoToken: string) => void;
  playerOneToken: string;
  playerTwoToken: string;
};

const TokenSelectionContainer = (props: Props) => {
  const players = ["one", "two"];
  const tokens = ["🦄", "🍄", "👑", "🦩"];

  const mapPlayers = players.map((player) => {
    const filterTokensOne = tokens.filter(
      (token) => token !== props.playerTwoToken
    );

    const filterTokensTwo = tokens.filter(
      (token) => token !== props.playerOneToken
    );

    return (
      <TokenSelection
        key={player}
        player={player}
        setPlayerToken={
          player === "one" ? props.setPlayerOneToken : props.setPlayerTwoToken
        }
        tokens={player === "one" ? filterTokensOne : filterTokensTwo}
      />
    );
  });
  return (
    <>
      <div className="token-div">{mapPlayers}</div>
      <div>
        <button
          className="token-complete-button"
          onClick={props.handleStartGame}
        >
          Start
        </button>
      </div>
    </>
  );
};

export default TokenSelectionContainer;