import Board from "./Board";
import ResultsContainer from "./ResultsContainer";
import { useState } from "react";
import calculateWinner from "../gamelogic";
import { MakeMoveService } from "../client";

type BoardProps = {
  board: Array<string>;
  setBoard: React.Dispatch<React.SetStateAction<Array<string>>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

const BoardContainer = (props: BoardProps) => {
  const [turn, setTurn] = useState("🦄");

  const winner = calculateWinner(props.board);
  const gameWinner = winner?.winner;
  const winningCombo = winner?.winningSquares;

  const handleSwitchToken = () => {
    if (turn === "🦄") {
      setTurn("🍄");
    } else {
      setTurn("🦄");
    }
  };

  async function handleMove(index: number) {
    MakeMoveService.makeMove({
      slot_index: index,
      token: turn,
    })
      .then((moveResponse) => {
        props.setBoard(moveResponse.slots);
        handleSwitchToken();
        props.setError(false);
      })
      .catch(() => {
        props.setError(true);
      });
  }

  return (
    <>
      <Board
        board={props.board}
        setBoard={props.setBoard}
        gameWinner={gameWinner}
        winningCombo={winningCombo}
        handleSwitchToken={handleSwitchToken}
        handleMove={handleMove}
        turn={turn}
        setError={props.setError}
      />
      <ResultsContainer gameWinner={gameWinner} turn={turn} />
    </>
  );
};

export default BoardContainer;
