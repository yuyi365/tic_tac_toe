type ResultProps = {
  gameWinner: string | undefined;
  turn: string;
};

const ResultsContainer = (props: ResultProps) => {
  return (
    <div className="results">
      {!props.gameWinner
        ? `It's your turn, player: ${props.turn}`
        : `Game is over - the winner is ${props.gameWinner}!`}
    </div>
  );
};

export default ResultsContainer;
