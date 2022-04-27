import Token from "./Token";

type Props = {
  player: string;
  setPlayerToken: (playerToken: string) => void;
};

const TokenSelection = (props: Props) => {
  const tokens = ["🦄", "🍄", "👑", "🦩"];
  const mapTokens = tokens.map((token) => {
    return (
      <Token
        key={token}
        token={token}
        player={props.player}
        setPlayerToken={props.setPlayerToken}
      />
    );
  });

  return (
    <>
      <h4 className="token-h4" key={props.player}>
        Player {props.player}, select your token:
      </h4>
      {mapTokens}
    </>
  );
};

export default TokenSelection;
