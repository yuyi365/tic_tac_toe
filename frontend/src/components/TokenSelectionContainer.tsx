import TokenSelection from "./TokenSelection";

const TokenSelectionContainer = () => {
  const players = ["one", "two"];

  const mapPlayers = players.map((player) => {
    return <TokenSelection key={player} player={player} />;
  });
  return <div>TokenSelectionContainer</div>;
};

export default TokenSelectionContainer;
