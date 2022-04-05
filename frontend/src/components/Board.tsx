import Square from "./Square";

type BoardProps = {
  board: Array<string>;
  gameWinner?: string;
  winningCombo?: number[];
  handleMove: (index: number) => void;
  handleError: (error: boolean) => void;
};

const Board = (props: BoardProps) => {
  const board = props.board;

  const getClassNames = (index: number) => {
    const token = board[index];

    if (!props.gameWinner && !token) {
      return "square";
    } else if (props.winningCombo?.includes(index)) {
      return "square-won";
    } else {
      return "square-clicked";
    }
  };

  const mapSquares = board.map((square, index) => {
    return (
      <Square
        key={index}
        index={index}
        token={board[index]}
        gameWinner={props.gameWinner}
        handleMove={props.handleMove}
        className={getClassNames(index)}
      />
    );
  });

  return (
    <>
      <table className="board">
        <tbody>
          <tr>{mapSquares.slice(0, 3)}</tr>
          <tr>{mapSquares.slice(3, 6)}</tr>
          <tr>{mapSquares.slice(6, 9)}</tr>
        </tbody>
      </table>
    </>
  );
};

export default Board;
