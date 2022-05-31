import Board from "./Board";
import ResultsContainer from "./ResultsContainer";
import LoadingContainer from "./LoadingContainer";
import { MakeMoveService, GetBoardService, Player } from "../client";
import { AppState } from "../appStates";
import { useState, useEffect } from "react";
import calculateWinner from "../gamelogic";

type BoardProps = {
  gameId: number;
  handleAppState: (appState: AppState) => void;
};

const BoardContainer = (props: BoardProps) => {
  const [board, setBoard] = useState<Array<string>>([]);
  const [turn, setTurn] = useState<Player>(Player._1);
  const [turnToken, setTurnToken] = useState("");
  const winner = calculateWinner(board);
  const gameWinner = winner?.winner;
  const winningCombo = winner?.winningSquares;

  useEffect(() => {
    findGameBoard(props.gameId);
  }, []);

  async function findGameBoard(gameId: number) {
    GetBoardService.getBoard(gameId)
      .then((boardResponse) => {
        handleBoardSetup(boardResponse);
      })
      .catch(() => {
        props.handleAppState(AppState.Error);
      });
  }

  async function handleBoardSetup(boardResponse: any) {
    setBoard(boardResponse.slots);
    setTurn(boardResponse.next_turn);
    setTurnToken(boardResponse.next_turn_token);
  }

  async function handleMove(index: number) {
    MakeMoveService.makeMove(props.gameId, {
      slot_index: index,
      player: turn,
    })
      .then(() => {
        findGameBoard(props.gameId);
      })
      .catch(() => {
        props.handleAppState(AppState.Error);
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
          />
          <ResultsContainer
            gameWinner={gameWinner}
            player={turnToken}
            gameId={props.gameId}
          />
        </>
      )}
    </>
  );
};

export default BoardContainer;
