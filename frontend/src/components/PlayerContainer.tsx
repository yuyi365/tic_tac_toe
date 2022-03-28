import TokenButton from "./TokenButton";

type PlayerProps = {
  setPlayers: React.Dispatch<
    React.SetStateAction<
      Array<{
        name: string;
        token: string;
      }>
    >
  >;
  player: object;
  key: string;
};

const PlayerContainer = (props: PlayerProps) => {
  const tokens = ["🦄", "🍄"];

  const mapTokens = tokens.map((token) => {
    return (
      <TokenButton
        key={token}
        token={token}
        setPlayers={props.setPlayers}
        player={props.player}
      />
    );
  });

  return (
    <>
      <h3>Player {props.player["name"]}, choose your token</h3>
      <div className="token-selection-div">{mapTokens}</div>
    </>
  );
};

export default PlayerContainer;
