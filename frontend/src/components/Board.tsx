import Square from "./Square";

type BoardProps = {
  board: Array<string>;
  setBoard: React.Dispatch<React.SetStateAction<Array<string>>>;
  gameWinner: string | undefined;
  winningCombo: number[] | undefined;
};

const Board = (props: BoardProps) => {
  const board = props.board;
  const setBoard = props.setBoard;

  return (
    <>
      <table className="board">
        <tbody>
          <tr>
            <Square
              index={0}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(0)}
            />
            <Square
              index={1}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(1)}
            />
            <Square
              index={2}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(2)}
            />
          </tr>
          <tr>
            <Square
              index={3}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(3)}
            />
            <Square
              index={4}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(4)}
            />
            <Square
              index={5}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(5)}
            />
          </tr>
          <tr>
            <Square
              index={6}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(6)}
            />
            <Square
              index={7}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(7)}
            />
            <Square
              index={8}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(8)}
            />
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Board;
