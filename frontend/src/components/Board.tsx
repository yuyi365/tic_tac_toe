import Square from "./Square";

type BoardProps = {
  board: Array<string>;
  setBoard: React.Dispatch<React.SetStateAction<Array<string>>>;
  gameWinner?: string;
  winningCombo?: number[];
  turn: string;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
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
              turn={props.turn}
              setTurn={props.setTurn}
            />
            <Square
              index={1}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(1)}
              turn={props.turn}
              setTurn={props.setTurn}
            />
            <Square
              index={2}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(2)}
              turn={props.turn}
              setTurn={props.setTurn}
            />
          </tr>
          <tr>
            <Square
              index={3}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(3)}
              turn={props.turn}
              setTurn={props.setTurn}
            />
            <Square
              index={4}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(4)}
              turn={props.turn}
              setTurn={props.setTurn}
            />
            <Square
              index={5}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(5)}
              turn={props.turn}
              setTurn={props.setTurn}
            />
          </tr>
          <tr>
            <Square
              index={6}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(6)}
              turn={props.turn}
              setTurn={props.setTurn}
            />
            <Square
              index={7}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(7)}
              turn={props.turn}
              setTurn={props.setTurn}
            />
            <Square
              index={8}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(8)}
              turn={props.turn}
              setTurn={props.setTurn}
            />
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Board;
