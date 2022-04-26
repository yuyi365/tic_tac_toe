import Token from "./Token";

const TokenSelection = () => {
  const tokens = ["🦄", "🍄", "👑", "🦩"];

  const mapTokens = tokens.map((token) => {
    return <Token key={token} token={token} />;
  });
  return (
    <>
      <div className="token-div">
        <h4>Player 1, select your token:</h4>
        {mapTokens}
      </div>

      <div className="token-div">
        <h4>Player 2, select your token:</h4>
        {mapTokens}
      </div>
    </>
  );
};

export default TokenSelection;
