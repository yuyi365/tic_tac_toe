import Board from "./Board";
import ResultsContainer from "./ResultsContainer";
import { DefaultService } from "../client";
import { useState, useEffect } from "react";
import calculateWinner from "../gamelogic";

const BoardContainer = () => {
  const [board, setBoard] = useState<Array<string>>([]);
  const [turn, setTurn] = useState("🦄");

  const winner = calculateWinner(board);
  const gameWinner = winner?.winner;
  const winningCombo = winner?.winningSquares;

  console.log(gameWinner);

  useEffect(() => {
    getBoard();
  }, []);

  async function getBoard() {
    const boardResponse = await DefaultService.boardBoardGet();
    setBoard(boardResponse.slots);
  }

  console.log(board);
  console.log(gameWinner);
  console.log(winningCombo);

  return (
    <>
      <Board
        board={board}
        setBoard={setBoard}
        gameWinner={gameWinner}
        winningCombo={winningCombo}
        turn={turn}
        setTurn={setTurn}
      />
      <ResultsContainer gameWinner={gameWinner} />

      <div className="reset-board-div">
        <button className="reset-board-button">New Game</button>
      </div>
    </>
  );
};

export default BoardContainer;
