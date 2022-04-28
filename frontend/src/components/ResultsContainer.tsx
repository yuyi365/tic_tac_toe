type ResultProps = {
  gameWinner: string | undefined;
  player: string;
  gameId: number;
};

const ResultsContainer = (props: ResultProps) => {
  return (
    <div className="results">
      {!props.gameWinner
        ? `It's your turn, player: ${props.player}`
        : `Game is over - the winner is ${props.gameWinner}!`}
      <p id="game-id">Game ID: {`${props.gameId}`}</p>
      <button id="save-game" onClick={() => window.location.reload()}>
        Save Game
      </button>
    </div>
  );
};

export default ResultsContainer;
