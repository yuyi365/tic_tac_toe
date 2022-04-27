type Props = {
  token: string;
  player: string;
};

const Token = (props: Props) => {
  const handleTokenSelection = (e: any) => {
    console.log(e.target.value);
    // if (e.target.key == "one") {
    //   setPlayerOneToken(e.target.value);
    // } else if (e.target.key == "two") {
    //   setPlayerTwoToken(e.target.value);
    // }
  };

  return (
    <>
      <button
        key={props.player}
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
