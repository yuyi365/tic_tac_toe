type Props = {
  token: string;
  setPlayerToken: (playerToken: string) => void;
};

const Token = (props: Props) => {
  const handleTokenSelection = (e: any) => {
    props.setPlayerToken(e.target.value);
  };

  return (
    <>
      <option
        id="token-option"
        value={props.token}
        onClick={(e) => handleTokenSelection(e)}
      >
        {props.token}
      </option>
    </>
  );
};

export default Token;
