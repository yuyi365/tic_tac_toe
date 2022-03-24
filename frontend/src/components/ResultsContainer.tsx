type ResultProps = {
  gameWinner: string | undefined;
};

const ResultsContainer = (props: ResultProps) => {
  return !props.gameWinner ? (
    <div className="results">Please place your token</div>
  ) : (
    <div className="results">{`Winner: ${props.gameWinner}`}</div>
  );
};

export default ResultsContainer;
