import Board from "./Board";
import ResultsContainer from "./ResultsContainer";
import LoadingContainer from "./LoadingContainer";
import { useState, useEffect } from "react";
import calculateWinner from "../gamelogic";
import { MakeMoveService, GetBoardService } from "../client";

type BoardProps = {
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  playerOneToken: string;
  playerTwoToken: string;
};

const BoardContainer = (props: BoardProps) => {
  const [turn, setTurn] = useState<string>(props.playerOneToken);
  const [board, setBoard] = useState<Array<string>>([]);
  const winner = calculateWinner(board);
  const gameWinner = winner?.winner;
  const winningCombo = winner?.winningSquares;

  useEffect(() => {
    getBoard();
  }, []);

  async function getBoard() {
    GetBoardService.getBoard()
      .then((boardResponse) => {
        setBoard(boardResponse.slots);
        props.setError(false);
      })
      .catch(() => {
        props.setError(true);
      });
  }

  const handleSwitchToken = () => {
    if (turn === props.playerOneToken) {
      setTurn(props.playerTwoToken);
    } else {
      setTurn(props.playerOneToken);
    }
  };

  async function handleMove(index: number) {
    MakeMoveService.makeMove({
      slot_index: index,
      token: turn,
    })
      .then(() => {
        getBoard();
        handleSwitchToken();
        props.setError(false);
      })
      .catch(() => {
        props.setError(true);
      });
  }

  return (
    <>
      {board.length === 0 ? (
        <LoadingContainer />
      ) : (
        <>
          <Board
            board={board}
            gameWinner={gameWinner}
            winningCombo={winningCombo}
            handleMove={handleMove}
            setError={props.setError}
          />
          <ResultsContainer gameWinner={gameWinner} turn={turn} />
        </>
      )}
    </>
  );
};

export default BoardContainer;
