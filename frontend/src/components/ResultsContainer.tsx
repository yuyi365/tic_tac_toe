type ResultProps = {
  gameWinner: string | undefined;
  player: string;
};

const ResultsContainer = (props: ResultProps) => {
  return (
    <div className="results">
      {!props.gameWinner
        ? `It's your turn, player: ${props.player}`
        : `Game is over - the winner is ${props.gameWinner}!`}
    </div>
  );
};

export default ResultsContainer;
