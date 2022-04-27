import TokenSelection from "./TokenSelection";

type Props = {
  handleStartGame: () => void;
  setPlayerOneToken: (playerOneToken: string) => void;
  setPlayerTwoToken: (playerTwoToken: string) => void;
};

const TokenSelectionContainer = (props: Props) => {
  const players = ["one", "two"];

  const mapPlayers = players.map((player) => {
    return (
      <TokenSelection
        key={player}
        player={player}
        setPlayerToken={
          player === "one" ? props.setPlayerOneToken : props.setPlayerTwoToken
        }
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
