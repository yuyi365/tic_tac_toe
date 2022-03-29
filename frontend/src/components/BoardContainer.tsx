import Board from "./Board";
import ResultsContainer from "./ResultsContainer";
import { GetBoardService } from "../client";
import { useState, useEffect } from "react";
import calculateWinner from "../gamelogic";

const BoardContainer = () => {
  const [board, setBoard] = useState<Array<string>>([]);
  const [turn, setTurn] = useState("🦄");

  const winner = calculateWinner(board);
  const gameWinner = winner?.winner;
  const winningCombo = winner?.winningSquares;

  useEffect(() => {
    getBoard();
  }, []);

  async function getBoard() {
    const boardResponse = await GetBoardService.getBoard();
    setBoard(boardResponse.slots);
  }

  const handleSwitchToken = () => {
    if (turn === "🦄") {
      setTurn("🍄");
    } else {
      setTurn("🦄");
    }
  };

  return (
    <>
      <Board
        board={board}
        setBoard={setBoard}
        gameWinner={gameWinner}
        winningCombo={winningCombo}
        handleSwitchToken={handleSwitchToken}
        turn={turn}
      />
      <ResultsContainer gameWinner={gameWinner} turn={turn} />
    </>
  );
};

export default BoardContainer;
