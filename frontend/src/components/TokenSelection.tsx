import { useState } from "react";
import Token from "./Token";

type Props = {
  player: string;
};

const TokenSelection = (props: Props) => {
  const tokens = ["🦄", "🍄", "👑", "🦩"];
  const mapTokens = tokens.map((token) => {
    return <Token key={token} token={token} player={props.player} />;
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
