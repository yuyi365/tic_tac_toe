type SquareProps = {
  index: number;
  token: string;
  gameWinner?: string;
  handleMove: (index: number) => void;
  className: string;
};

const Square = (props: SquareProps) => {
  return (
    <td
      className={props.className}
      onClick={() =>
        !props.gameWinner ? props.handleMove(props.index) : undefined
      }
    >
      {props.token}
    </td>
  );
};

export default Square;
