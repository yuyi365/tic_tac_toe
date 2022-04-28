import Board from "./Board";
import ResultsContainer from "./ResultsContainer";
import LoadingContainer from "./LoadingContainer";
import { MakeMoveService, GetBoardService, Player } from "../client";

type BoardProps = {
  handleError: (error: boolean) => void;
  board: Array<string>;
  winner: any;
  gameId: number;
  setBoard: (board: Array<string>) => void;
  turn: Player;
  setTurn: (turn: Player) => void;
};

const BoardContainer = (props: BoardProps) => {
  const gameWinner = props.winner?.winner;
  const winningCombo = props.winner?.winningSquares;

  const handleSwitchToken = () => {
    if (props.turn === Player._1) {
      props.setTurn(Player._2);
    } else {
      props.setTurn(Player._1);
    }
  };

  async function handleMove(index: number) {
    MakeMoveService.makeMove(props.gameId, {
      slot_index: index,
      player: props.turn,
    })
      .then(() => {
        handleSwitchToken();
        props.handleError(false);
        GetBoardService.getBoard(props.gameId)
          .then((boardResponse) => {
            props.setBoard(boardResponse.slots);
            props.setTurn(boardResponse.next_turn);
          })
          .catch(() => {
            props.handleError(true);
          });
      })
      .catch(() => {
        props.handleError(true);
      });
  }

  return (
    <>
      {props.board.length === 0 ? (
        <LoadingContainer />
      ) : (
        <>
          <Board
            board={props.board}
            gameWinner={gameWinner}
            winningCombo={winningCombo}
            handleMove={handleMove}
            handleError={props.handleError}
          />
          <ResultsContainer gameWinner={gameWinner} player={props.turn} />
        </>
      )}
    </>
  );
};

export default BoardContainer;
