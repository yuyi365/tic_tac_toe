type Props = {
  token: string;
};

const Token = (props: Props) => {
  return (
    <>
      <button value={props.token} className="token-button">
        {props.token}
      </button>
    </>
  );
};

export default Token;
