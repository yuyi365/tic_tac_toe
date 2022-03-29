import Square from "./Square";

type BoardProps = {
  board: Array<string>;
  setBoard: React.Dispatch<React.SetStateAction<Array<string>>>;
  gameWinner?: string;
  winningCombo?: number[];
  handleSwitchToken: Function;
  turn: string;
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
              handleSwitchToken={props.handleSwitchToken}
              turn={props.turn}
            />
            <Square
              index={1}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(1)}
              handleSwitchToken={props.handleSwitchToken}
              turn={props.turn}
            />
            <Square
              index={2}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(2)}
              handleSwitchToken={props.handleSwitchToken}
              turn={props.turn}
            />
          </tr>
          <tr>
            <Square
              index={3}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(3)}
              handleSwitchToken={props.handleSwitchToken}
              turn={props.turn}
            />
            <Square
              index={4}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(4)}
              handleSwitchToken={props.handleSwitchToken}
              turn={props.turn}
            />
            <Square
              index={5}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(5)}
              handleSwitchToken={props.handleSwitchToken}
              turn={props.turn}
            />
          </tr>
          <tr>
            <Square
              index={6}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(6)}
              handleSwitchToken={props.handleSwitchToken}
              turn={props.turn}
            />
            <Square
              index={7}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(7)}
              handleSwitchToken={props.handleSwitchToken}
              turn={props.turn}
            />
            <Square
              index={8}
              board={board}
              setBoard={setBoard}
              gameWinner={props.gameWinner}
              isInWinningCombo={props.winningCombo?.includes(8)}
              handleSwitchToken={props.handleSwitchToken}
              turn={props.turn}
            />
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Board;
