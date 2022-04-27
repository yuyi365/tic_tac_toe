type Props = {
  token: string;
  player: string;
  setPlayerToken: (playerToken: string) => void;
};

const Token = (props: Props) => {
  const handleTokenSelection = (e: any) => {
    props.setPlayerToken(e.target.value);
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
