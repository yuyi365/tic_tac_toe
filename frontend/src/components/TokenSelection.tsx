import Token from "./Token";

type Props = {
  player: string;
  setPlayerToken: (playerToken: string) => void;
  tokens: Array<string>;
};

const TokenSelection = (props: Props) => {
  const mapTokens = props.tokens.map((token) => {
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
      <select name="tokens" id="id_tokens" multiple>
        {mapTokens}
      </select>
    </>
  );
};

export default TokenSelection;
