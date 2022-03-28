import PlayerContainer from "./PlayerContainer";

type PlayerProps = {
  players: Array<object>;
  setPlayers: React.Dispatch<
    React.SetStateAction<
      Array<{
        name: string;
        token: string;
      }>
    >
  >;
};

const LandingPage = (props: PlayerProps) => {
  const mapPlayers = props.players.map((player) => {
    return (
      <PlayerContainer
        key={player["name"]}
        player={player}
        setPlayers={props.setPlayers}
      />
    );
  });

  return (
    <>
      <div className="landing">{mapPlayers}</div>
      <button className="start-game-button">Start Game</button>
    </>
  );
};

export default LandingPage;
