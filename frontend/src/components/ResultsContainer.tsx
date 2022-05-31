type ResultProps = {
  gameWinner: string | undefined;
  player: string;
  gameId: number;
};

const ResultsContainer = (props: ResultProps) => {
  return (
    <div className="results">
      {!props.gameWinner ? (
        <p data-testid="results">It's your turn, player: {props.player}</p>
      ) : (
        <p data-testid="results">
          Game is over - the winner is {props.gameWinner}!
        </p>
      )}
      <p id="game-id" data-testid="game-id">
        Game ID: {`${props.gameId} - save this ID to resume game`}
      </p>

      <button id="save-game" onClick={() => window.location.reload()}>
        Home
      </button>
    </div>
  );
};

export default ResultsContainer;
