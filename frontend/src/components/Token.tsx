import { useState } from "react";

type Props = {
  token: string;
  player: string;
  setPlayerToken: (playerToken: string) => void;
};

const Token = (props: Props) => {
  const [clickedToken, setClickedToken] = useState(false);
  const handleTokenSelection = (e: any) => {
    props.setPlayerToken(e.target.value);
    setClickedToken(!clickedToken);
  };

  return (
    <>
      <button
        value={props.token}
        className="token-button"
        onClick={(e) => handleTokenSelection(e)}
      >
        {props.token}
      </button>
    </>
  );
};

export default Token;
