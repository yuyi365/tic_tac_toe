type ButtonProps = {
  token: string;
  setPlayers: React.Dispatch<
    React.SetStateAction<
      Array<{
        name: string;
        token: string;
      }>
    >
  >;
  player: object;
};

const TokenButton = (props: ButtonProps) => {
  const handleSelection = (e: any) => {
    console.log(e.target.value);
    console.log(e);
  };

  return (
    <button
      key={props.token}
      value={props.token}
      className="token-selection-button"
      onClick={(e) => handleSelection(e)}
    >
      {props.token}
    </button>
  );
};

export default TokenButton;
