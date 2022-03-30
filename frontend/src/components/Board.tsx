import Square from "./Square";
import { MakeMoveService } from "../client";

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

  async function handleMove(index: number) {
    MakeMoveService.makeMove({
      slot_index: index,
      token: props.turn,
    })
      .then((moveResponse) => {
        setBoard(moveResponse.slots);
        props.handleSwitchToken();
      })
      .catch(() => {
        alert("backend is down");
      });
  }

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

  return (
    <>
      <table className="board">
        <tbody>
          <tr>
            <Square
              index={0}
              token={board[0]}
              gameWinner={props.gameWinner}
              handleMove={handleMove}
              className={getClassNames(0)}
            />
            <Square
              index={1}
              token={board[1]}
              gameWinner={props.gameWinner}
              handleMove={handleMove}
              className={getClassNames(1)}
            />
            <Square
              index={2}
              token={props.board[2]}
              gameWinner={props.gameWinner}
              handleMove={handleMove}
              className={getClassNames(2)}
            />
          </tr>
          <tr>
            <Square
              index={3}
              token={props.board[3]}
              gameWinner={props.gameWinner}
              handleMove={handleMove}
              className={getClassNames(3)}
            />
            <Square
              index={4}
              token={props.board[4]}
              gameWinner={props.gameWinner}
              handleMove={handleMove}
              className={getClassNames(4)}
            />
            <Square
              index={5}
              token={props.board[5]}
              gameWinner={props.gameWinner}
              handleMove={handleMove}
              className={getClassNames(5)}
            />
          </tr>
          <tr>
            <Square
              index={6}
              token={props.board[6]}
              gameWinner={props.gameWinner}
              handleMove={handleMove}
              className={getClassNames(6)}
            />
            <Square
              index={7}
              token={props.board[7]}
              gameWinner={props.gameWinner}
              handleMove={handleMove}
              className={getClassNames(7)}
            />
            <Square
              index={8}
              token={props.board[8]}
              gameWinner={props.gameWinner}
              handleMove={handleMove}
              className={getClassNames(8)}
            />
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Board;
